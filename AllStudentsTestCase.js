import './assets/bootstrap/css/bootstrap.min.css';
import Footer from './Footer';
import NavBar from './NavBar';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { FaPlayCircle } from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import { Box, Typography } from '@mui/material';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';


export const AllStudentsTestCase = () => {
    const labParts2 = ['Part A', 'Part B', 'Part C'];

    const labPartTestCases2 = {
        'Part A': 3,
        'Part B': 2,
        'Part C': 2
      };      
    const studentList = [
        {
            name: 'Alice',
            testResults: {
                'Part A': ['successful', 'error', 'successful'],
                'Part B': ['unsuccessful', 'successful'],
                'Part C': ['successful', 'unsuccessful']
            }
        },
        {
            name: 'Bob',
            testResults: {
                'Part A': ['unsuccessful', 'unsuccessful', 'successful'],
                'Part B': ['successful', 'successful'],
                'Part C': ['successful', 'successful']
            }
        },
        {
            name: 'Alice',
            testResults: {
                'Part A': ['successful', 'error', 'successful'],
                'Part B': ['unsuccessful', 'successful'],
                'Part C': ['successful', 'unsuccessful']
            }
        },
        {
            name: 'Bob',
            testResults: {
                'Part A': ['unsuccessful', 'unsuccessful', 'successful'],
                'Part B': ['successful', 'successful'],
                'Part C': ['successful', 'successful']
            }
        },
        {
            name: 'Alice',
            testResults: {
                'Part A': ['successful', 'error', 'successful'],
                'Part B': ['unsuccessful', 'successful'],
                'Part C': ['successful', 'unsuccessful']
            }
        },
        {
            name: 'Bob',
            testResults: {
                'Part A': ['unsuccessful', 'unsuccessful', 'successful'],
                'Part B': ['successful', 'successful'],
                'Part C': ['successful', 'successful']
            }
        },
        {
            name: 'Alice',
            testResults: {
                'Part A': ['successful', 'error', 'successful'],
                'Part B': ['unsuccessful', 'successful'],
                'Part C': ['successful', 'unsuccessful']
            }
        },
        {
            name: 'Bob',
            testResults: {
                'Part A': ['unsuccessful', 'unsuccessful', 'successful'],
                'Part B': ['successful', 'successful'],
                'Part C': ['successful', 'successful']
            }
        }
    ]; 
    const labResults = [ '4/7', '5/7', '4/7', '5/7', '4/7', '5/7', '4/7', '5/7' ]
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [isLoading, setIsLoading] = useState(true);

    const [labNo, setLabNo] = useState(null);
    const [courseCode, setCourseCode] = useState(null);
    const [labParts, setLabParts] = useState(null);
    const [students, setStudents] = useState(null);
    const [uploadedLabParts, setUploadedLabParts] = useState(null);

    const { courseId, labId } = useParams();

    // const [uploadedLabParts, setUploadedLabParts] = useState(null);
    // const [labPartCount, setLabPartCount] = useState(null);
    // const [labPartNos, setLabPartNos] = useState(null);
    // const [labPartTestCases, setLabPartTestCases] = useState(null);

    useEffect(() => {
        // const courseId = localStorage.getItem('courseId');
        // const labId = localStorage.getItem('labId');
        const jwtToken = localStorage.getItem('jwtToken'); // Retrieve the stored JWT token

        const fetchUploadedLabs = async () => {
            if(!courseId) {
                console.error('Course ID is not available.');
                return;
            }

            if(!labId) {
                console.error('Lab ID is not available.');
                return;
            }

            // UPLOADED LAB ID, LAB NO AND LAB PART COUNT
            try {
                const response = await axios.get(`http://localhost:8080/lab_assignment/${labId}`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });

                console.log('Fetched Lab:', response.data);

                setLabNo(response.data.labNo);
                // setLabPartCount(response.data.noOfParts)

                const uploadedLabIds = response.data.uploadedLabIDs;

                // COURSE CODE
                const fetchCourseCode = async (courseId) => {
                    try{
                        const courseResponse = await axios.get(`http://localhost:8080/course/${courseId}`, {
                            headers: {
                                'Authorization': `Bearer ${jwtToken}`
                            }
                        });

                        console.log("Course:", courseResponse.data.courseCode);
                        return courseResponse.data.courseCode;

                    } catch (error) {
                        console.error('Failed to fetch course: ', error);
                        return null;
                    }
                }

                const curCourse = await fetchCourseCode(courseId);
                setCourseCode(curCourse);
                // console.log("Current Course:", courseCode); // this sometimes returns null because fetchCourseCode is asynchronous
                
                // UPLOADED LAB DETAILS
                // const fetchLabDetails = async (labId) => {
                //     try {
                //         const labResponse = await axios.get(`http://localhost:8080/uploadedLabPart/${labId}`, {
                //             headers: {
                //                 'Authorization': `Bearer ${jwtToken}`
                //             }
                //         });

                //         console.log("Uploaded Lab: ", labResponse.data)
                //         return labResponse.data;

                //     } catch (error) {
                //         console.error('Failed to fetch uploaded labs: ', error);
                //         return null;
                //     }
                // };

                // const labs = [];

                // for(let i = 0; i < uploadedLabIds.length; i++) {
                //     const labDetails = await fetchLabDetails(uploadedLabIds[i]);
                //     console.log('Details of uploaded lab with ID ', uploadedLabIds[i], ':', labDetails);
                //     labs.push(labDetails);
                // }
                // setUploadedLabParts(labs);

                // LAB PARTS
                const fetchLabParts = async (labId) => {
                    const labPartResponse = await axios.get(`http://localhost:8080/lab_part/by_lab_id/${labId}`, {
                            headers: {
                                'Authorization': `Bearer ${jwtToken}`
                            }
                        });

                        console.log("Lab Parts:", labPartResponse.data);
                        return labPartResponse.data
                }
                const labbs = await fetchLabParts(labId);
                console.log("labbs:", labbs);

                // setLabPartTestCases(labbs);
                setLabParts(labbs);

                // const labPartTestCases = labbs.reduce((acc, lab) => {
                //     acc.push({ id: lab.id, partNo: lab.partNo, testCaseCount: lab.testCaseIDs ? lab.testCaseIDs.length : 0 });
                //     return acc;
                // }, []);

                // setLabPartTestCases(labPartTestCases);
                // console.log('Lab Part Test Cases:', labPartTestCases)

                // const labPartNos = labbs.map(lab => lab.partNo);
                // setLabPartNos(labPartNos);

                // console.log("labPartNos:", labPartNos)

                // if (labbs) {
                //     const labPartNos = labbs.map(lab => lab.partNo);
                //     setLabPartNos(labPartNos);

                //     const labPartTestCases = {};
                //     labbs.forEach(lab => {
                //         labPartTestCases[lab.partNo] = lab.testCaseIDs.length;
                //     });
                //     console.log('Lab Part Test Cases:', labPartTestCases);
                //     setLabPartTestCases(labPartTestCases);
                // } else {
                //     console.error('Lab parts are null');
                // }         
                
                // UPLOADED LAB PART DETAILS


            } catch (error) {
                console.error('Failed to fetch labs: ', error);
            }
            setIsLoading(false);
        };
        fetchUploadedLabs();
    }, []);
    
    const tableHeaderCells = [];
    tableHeaderCells.push(
        <td key={`empty`}></td>
    );
    for (const labPart in labPartTestCases2) {
        for (let i = 1; i <= labPartTestCases2[labPart]; i++) {
            tableHeaderCells.push(
            <td key={`${labPart}-test-case-${i}`}>
                Test Case {i}
            </td>
            );
        }
    }
    tableHeaderCells.push(
        <td key={`empty`}></td>
    );
        
    // useEffect(() => {
    //     document.title = 'CODED. | Lab 3 Test Case Results';
    //   }, []);

    useEffect(() => {
        applyTextGradient('headerText', ['#2B0AFF', '#C307F9', '#EA38C1', '#FF8CAF', '#FB8F8B']);
    }, []);

    function applyTextGradient(elementId, colors) {
        var element = document.getElementById(elementId);
        if (element) {
            element.style.background = `linear-gradient(to right, ${colors.join(', ')})`;
            element.style.webkitBackgroundClip = 'text';
            element.style.color = 'transparent';
            element.style.display = 'inline-block';
        }
    }  

    const OneTestCaseButton = ({ id, buttonText, testCase, student }) => {
        const [isHovered, setIsHovered] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
    
        const handleMouseEnter = () => {
            setIsHovered(true);
        };
    
        const handleMouseLeave = () => {
            setIsHovered(false);
        };
    
        const handleTestCaseRun = () => {
            // // Send test case and student information to the backend
            // // You can use fetch or any other method to send a request to the backend
            // fetch('your-backend-endpoint', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         testCase: testCase,
            //         student: student
            //     }),
            // })
            // .then(response => {
            //     // Handle response from the backend if needed
            // })
            // .catch(error => {
            //     // Handle errors if any
            //     console.error('Error:', error);
            // });

            setIsLoading(true);
            setTimeout(() => {
                // End loading state
                setIsLoading(false);
            }, 2000);
        };
    
        return (
            <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleTestCaseRun}
                style={{
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    margin: 0,
                    border: 'none',
                    background: isHovered ? '#f0f0f0' : 'transparent'
                }}
            >
                {isLoading ? <CircularProgress color='inherit' /> : (isHovered ? <FaPlayCircle color='#1d0042'/> : buttonText)}
            </button>
        );
    };

    const OneStudentTestCasesButton = ({ buttonText }) => {
        const [isHovered, setIsHovered] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
    
        const handleMouseEnter = () => {
            setIsHovered(true);
        };
    
        const handleMouseLeave = () => {
            setIsHovered(false);
        };
    
        const handleTestCaseRun = () => {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        };
    
        return (
            <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleTestCaseRun}
                style={{
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    margin: 0,
                    border: 'none',
                    background: isHovered ? '#f0f0f0' : 'transparent'
                }}
            >
                {isLoading ? <CircularProgress color='inherit'/> : (isHovered ? <FaPlayCircle color='#1d0042'/> : buttonText)}
            </button>
        );
    };

    const AllStudentsOneTesCaseButton = () => {
        const [isHovered, setIsHovered] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
    
        const handleMouseEnter = () => {
            setIsHovered(true);
        };
    
        const handleMouseLeave = () => {
            setIsHovered(false);
        };
    
        const handleTestCaseRun = () => {
            setIsLoading(true);
            setTimeout(() => {
                // End loading state
                setIsLoading(false);
            }, 2000);
        };
    
        return (
            <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleTestCaseRun}
                style={{
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    margin: 0,
                    border: 'none',
                    background: isHovered ? '#f0f0f0' : 'transparent'
                }}
            >
                    {isLoading ? <CircularProgress color='inherit'/> : <FaPlayCircle color='#1d0042'/>}
            </button>
        );
    };

    const TestCaseModalButton = ({buttonText}) => {
        const [isOpen, setIsOpen] = useState(false);

        const handleClick = () => {
            setIsOpen(true);
        };

        const handleClose = () => {
            setIsOpen(false);
        }

        return (
            <div>
                <button
                    onClick={handleClick}
                    style={{
                        borderRadius: '13px',
                        borderColor: 'transparent'
                    }}
                    >
                    {buttonText}
                </button>

                <Modal
                    open={isOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                 >
                    <Box style = {{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            border: '2px solid #f0f0f0',
                            borderRadius: '13px',
                            boxShadow: 24,
                            p: '2rem', // Responsive padding
                            '@media (max-width: 768px)': { // Apply specific styles for smaller screens
                                width: '90%',
                                maxWidth: '90%',
                                p: '1rem', // Adjust padding for smaller screens
                            },
                        }}>                        
                        <div>
                            <button
                                style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    background: 'transparent',
                                    borderColor: 'transparent'
                                }}
                                onClick={handleClose}>
                                <RxCross2/>
                            </button>
                        </div>

                        <div>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Text in a modal
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                        </div>
                    </Box>
                </Modal>
            </div>
        );

    };

    const [allTestsButtonHovered, setAllTestsButtonHovered] = useState(false);
    const [allTestsButtonText, setAllTestsButtonText] = useState('Re-Run All Test Cases')
    const handleAllTestsClick = () => {
        setAllTestsButtonText(<CircularProgress color='inherit'/>);

        setTimeout(() => {
            setAllTestsButtonText('Re-Run All Test Cases');
        }, 2000);
    
        setAllTestsButtonHovered(false);
    };

    if (isLoading) {
        return <div className="App">Loading...</div>;
    } else {
        return(
            <>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
                />
                <title>CODED | Dashboard</title>
                <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Raleway:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&display=swap"
                />

                <NavBar/>

                <section className="py-4 py-md-5 my-5">
                    <header>
                        <div className="container pt-4 pt-l-5">
                            <div className="row">
                                <div className="col-12 col-md-8">
                                    <div className="all-courses-header">
                                        <h2 className="display-6 fw-bold mb-3" style={{ color: 'black' }}>
                                            <span id="headerText">
                                                <strong>{courseCode} Lab {labNo} Test Case Results</strong>
                                            </span>
                                        </h2>
                                </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div>
                        <div className="container pt-4 pt-xl-5">
                            <hr />
                            <div className="row pt-5">
                                <div className="col-md-8 col-lg-9 text-center text-md-start mx-auto">
                                    <div
                                        className="table-responsive text-center d-lg-flex"
                                        style={{ boxShadow: "0px 0px 14px 2px #bec1de", borderRadius: '13px' }}
                                    >
                                        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }} className="table table-striped-columns table-hover">
                                            <thead>
                                                <tr>
                                                    <th style={{ textAlign: 'center', color: '#1d0042' }}>Name</th>
                                                    {Object.keys(labParts).map((index) => (
                                                        <th>Part {labParts[index].partNo}</th>
                                                    ))}
                                                    <th>Result</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {studentList.map((student, stuindex) => (
                                                    <tr key={stuindex}>
                                                        <td>{student.name}</td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="container">
                        <div className="row">
                        <div className="col">
                            {/* <table className="table">
                            <thead>
                                <tr>
                                <th>Lab Part</th> */}
                                {/* {labPartNos.map(index => (
                                    <th key={index}>Part {index}</th>
                                ))} */}
                                {/* {Object.keys(labParts).map((index) => (
                                    <th>Part {labParts[index].partNo}</th>
                                ))}
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, stuindex) => (
                                <tr key={stuindex}>
                                    <td>{student.name}</td> */}

                                    {/* {Object.keys(labParts).map((labindex) => ( 
                                        // <td key={labPartTestCases[labPartIndex].id}>{labPartIndex}</td>
                                        // <td>{labParts[labPartIndex].id}</td>
                                        // Array.from(length: labParts[index], (item, indexx) => (
                                        //     <td>hett</td>
                                        // )
                                        student.testResults[labParts[labindex].partNo].map((result, resultIndex) => (
                                            <td style={{ textAlign: 'center' }}>
//                                              <OneTestCaseButton
                                                    id={`button-${stuindex}-${labindex}-${resultIndex}`} //check these
                                                    buttonText={result === 'successful' ? (
                                                        <IoMdCheckmarkCircleOutline color='green' />
                                                    ) : result === 'unsuccessful' ? (
                                                        <IoMdCloseCircleOutline color='red' />
                                                    ) : (
                                                        <IoWarningOutline color='#cfb704'/>
                                                    )}
                                                    testCase={resultIndex} // this may need to change
                                                    student={student}
                                                />
                                            </td>
                                        ))


                                        // <React.Fragment key={index}>
                                        //</React.Fragment>    {Array.from({ length: labParts[index] }, (item, index2) => (
                                        //         <td key={item}>hey</td>
                                        //     ))}
                                        // </React.Fragment>
                                        
                                    ))}                              */}
                                    
                                {/* </tr>
                                ))} 
                            </tbody>
                            </table> */}
                        </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }


    // return (
    //     <>
    //         <meta charSet="utf-8" />
    //         <meta
    //             name="viewport"
    //             content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
    //         />
    //         <title>CODED | Dashboard</title>
    //         <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
    //         <link
    //             rel="stylesheet"
    //             href="https://fonts.googleapis.com/css?family=Raleway:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&display=swap"
    //         />

    //         <NavBar/>

    //         <section className="py-4 py-md-5 my-5">
    //             <header>
    //                 <div className="container pt-4 pt-l-5">
    //                     <div className="row">
    //                         <div className="col-12 col-md-8">
    //                             <div className="all-courses-header">
    //                                 <h2 className="display-6 fw-bold mb-3" style={{ color: "#3c76ad" }}>
    //                                     <span id="headerText">
    //                                         <strong>{courseCode} Lab {labNo} Test Case Results</strong>
    //                                     </span>
    //                                 </h2>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </header>

    //             <div>
    //                 <div className="container pt-4 pt-xl-5">
    //                     <hr />
    //                     <div className="row pt-5">
    //                         <div className="col-md-8 col-lg-9 text-center text-md-start mx-auto">
    //                             <div
    //                                 className="table-responsive text-center d-lg-flex"
    //                                 style={{ boxShadow: "0px 0px 14px 2px #bec1de", borderRadius: '13px' }}
    //                             >
    //                                 <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }} className="table table-striped-columns table-hover">
    //                                     <thead>
    //                                         <tr>
    //                                         <th style={{ textAlign: 'center', color: '#1d0042' }}>Name</th>
    //                                         {Object.keys(labPartTestCases2).map((labPart, labPartIndex) => (
    //                                             <th key={labPartIndex} style={{ textAlign: 'center' }} colSpan={labPartTestCases2[labPart]}>
    //                                             {labPart}
    //                                             </th>
    //                                         ))}
    //                                         <th>Result</th>
    //                                         </tr>
    //                                     </thead>
    //                                     <tbody>
    //                                         {/* <tr>
    //                                             {tableHeaderCells.map((text, index) => (
    //                                                 <td>
    //                                                     {text.key === 'empty' ? '' : <TestCaseModalButton buttonText={tableHeaderCells[index]} />}
    //                                                 </td>
    //                                             ))}
    //                                         </tr> */}

    //                                         <tr>
    //                                             {tableHeaderCells.map((text, index) => (
    //                                                 <td key={index}>
    //                                                     {text.key === 'empty' ? '' : <TestCaseModalButton buttonText={text} />}
    //                                                 </td>
    //                                             ))}
    //                                         </tr>

    //                                         {students.map((student, studentIndex) => (
    //                                             <tr key={studentIndex}>
    //                                                 <td style={{ textAlign: 'center', paddingLeft: '10px' }}>{student.name}</td>
    //                                                 { Object.keys(labPartTestCases2).map((labPart, labPartIndex) => (
    //                                                     student.testResults[labPart].map((result, resultIndex) => (
    //                                                         <td key={`${labPart}-${studentIndex}-${resultIndex}`} style={{ textAlign: 'center' }}>
    //                                                             <OneTestCaseButton
    //                                                                 id={`button-${studentIndex}-${labPart}-${resultIndex}`}
    //                                                                 buttonText={result === 'successful' ? (
    //                                                                     <IoMdCheckmarkCircleOutline color='green' />
    //                                                                 ) : result === 'unsuccessful' ? (
    //                                                                     <IoMdCloseCircleOutline color='red' />
    //                                                                 ) : (
    //                                                                     <IoWarningOutline color='#cfb704'/>
    //                                                                 )}
    //                                                                 testCase={resultIndex} // this may need to change
    //                                                                 student={student}
    //                                                             />
    //                                                         </td>
    //                                                     ))
    //                                                 ))}

    //                                                 <td style={{ textAlign: 'center' }}>
    //                                                     <OneStudentTestCasesButton 
    //                                                         buttonText={labResults[studentIndex]}

    //                                                     />
    //                                                 </td>

    //                                             </tr>
    //                                         ))}
    //                                         <tr>
    //                                             {tableHeaderCells.map((text, index) => (
    //                                                 <td>
    //                                                     {tableHeaderCells[index].key === 'empty' ? '' : <AllStudentsOneTesCaseButton />}    
    //                                                 </td>
    //                                             ))}
                         
    //                                         </tr>
    //                                     </tbody>
    //                                 </table>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="mt-3 text-center"> {/* Add margin top with Bootstrap spacing classes */}
    //                         <div className="row justify-content-center align-items-center"> {/* Center both horizontally and vertically */}
    //                             <div className="col-12 col-md-6"> {/* Adjust column size */}
    //                                 <button
    //                                     className="btn btn-primary shadow"
    //                                     role="button"
    //                                     onMouseEnter={() => setAllTestsButtonHovered(true)}
    //                                     onMouseLeave={() => setAllTestsButtonHovered(false)}
    //                                     onClick={handleAllTestsClick}
    //                                     style={{
    //                                         background: allTestsButtonHovered ? `linear-gradient(to right, #C307F9, #EA38C1,  #FB8F8B)` : "#ffffff",
    //                                         color: allTestsButtonHovered ? "#ffffff" : "#a50bf6",
    //                                         boxShadow: "0px 0px 8px 7px var(--bs-navbar-active-color), 0px 0px",
    //                                         borderRadius: 13,
    //                                         borderWidth: 3,
    //                                         borderColor: allTestsButtonHovered ? "#ffffff" : "#a50bf6",
    //                                         width: '100%', // Make the button width 100% of its parent container
    //                                         maxWidth: '250px', // Set maximum width for the button
    //                                         margin: 'auto' // Center the button horizontally
    //                                     }}
    //                                 >
    //                                     {allTestsButtonText}
    //                                 </button>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </section>




    //         <Footer/>
    //     </>
    // )
}