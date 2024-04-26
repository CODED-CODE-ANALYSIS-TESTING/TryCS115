import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import "./CodeAnalysis.css";
import { dark, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import pythonCode from "./exampleCode.py";
import ReactTooltip from "react-tooltip";
import { SonarQubeIssue } from "./SonarQubeIssue";
import Bubble from "./Bubble";
import './Bubble.css';

//sonarQubeData.issues.rule
//sonarQube.issues.message
//sonarQube.line
//sonarQube.issues.textRange.startLine
//sonarQube.issues.textRange.endLine
//sonarQube.issues.textRange.startOffset
//sonarQube.issues.textRange.endOffset

const CodeAnalysis = () => {
  const [enrollButtonHovered, setEnrollButtonHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [initialBorderStyle, setInitialBorderStyle] = useState(
    "1px solid rgba(0, 0, 0, 0.125)"
  );
  const [studentCode, setStudentCode] = useState("");
  const [selectedLine, setSelectedLine] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [issues, setIssues] = useState([]);
  const [hoveredLine, setHoveredLine] = useState(null);
  const [bubbles, setBubbles] = useState([]);
  const [activeIssue, setActiveIssue] = useState(null);
  const [selectedActiveBubble, setSelectedActiveBubble] = useState(null);
  const [isDarkMode, setDarkMode] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(0); // Start with the default sidebar width
  const [selectedBubbleId, setSelectedBubbleId] = useState(null);
  const [downloadButtonHovered, setDownloadButtonHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const codeLines = studentCode.split("\n");
  const fetchData = () => {
    const sonarQubeData = {
      paging: {
        pageIndex: 1,
        pageSize: 100,
        total: 1,
      },
      issues: [
        {
          key: "01fc972e-2a3c-433e-bcae-0bd7f88f5123",
          component:
            "com.github.kevinsawicki:http-request:com.github.kevinsawicki.http.HttpRequest",
          project: "com.github.kevinsawicki:http-request",
          rule: "java:S1144",
          cleanCodeAttribute: "CLEAR",
          cleanCodeAttributeCategory: "INTENTIONAL",
          issueStatus: "ACCEPTED",
          impacts: [
            {
              softwareQuality: "SECURITY",
              severity: "HIGH",
            },
          ],
          message: "Code smell due to mistake here.",
          messageFormattings: [
            {
              start: 0,
              end: 4,
              type: "CODE",
            },
          ],
          line: 81,
          hash: "a227e508d6646b55a086ee11d63b21e9",
          author: "Developer 1",
          effort: "2h1min",
          creationDate: "2013-05-13T17:55:39+0200",
          updateDate: "2013-05-13T17:55:39+0200",
          tags: ["bug"],
          comments: [
            {
              key: "7d7c56f5-7b5a-41b9-87f8-36fa70caa5ba",
              login: "john.smith",
              htmlText: 'Must be "public"!',
              markdown: 'Must be "public"!',
              updatable: false,
              createdAt: "2013-05-13T18:08:34+0200",
            },
          ],
          attr: {
            "jira-issue-key": "SONAR-1234",
          },
          transitions: ["reopen"],
          actions: ["comment"],
          textRange: {
            startLine: 12,
            endLine: 20,
            startOffset: 0,
            endOffset: 32,
          },
          flows: [
            {
              locations: [
                {
                  textRange: {
                    startLine: 16,
                    endLine: 16,
                    startOffset: 0,
                    endOffset: 30,
                  },
                  msg: "Expected position: 5",
                  msgFormattings: [
                    {
                      start: 0,
                      end: 4,
                      type: "CODE",
                    },
                  ],
                },
              ],
            },
            {
              locations: [
                {
                  textRange: {
                    startLine: 15,
                    endLine: 15,
                    startOffset: 0,
                    endOffset: 37,
                  },
                  msg: "Expected position: 6",
                  msgFormattings: [],
                },
              ],
            },
          ],
          quickFixAvailable: false,
          ruleDescriptionContextKey: "spring",
          codeVariants: ["windows", "linux"],
        },
        {
          key: "01fc972e-2a3c-433e-bcae-0bd7f88f5123",
          component:
            "com.github.kevinsawicki:http-request:com.github.kevinsawicki.http.HttpRequest",
          project: "com.github.kevinsawicki:http-request",
          rule: "java:S1144",
          cleanCodeAttribute: "CLEAR",
          cleanCodeAttributeCategory: "INTENTIONAL",
          issueStatus: "ACCEPTED",
          impacts: [
            {
              softwareQuality: "SECURITY",
              severity: "HIGH",
            },
          ],
          message: "No documentation comment",
          messageFormattings: [
            {
              start: 0,
              end: 4,
              type: "CODE",
            },
          ],
          line: 81,
          hash: "a227e508d6646b55a086ee11d63b21e9",
          author: "Developer 1",
          effort: "2h1min",
          creationDate: "2013-05-13T17:55:39+0200",
          updateDate: "2013-05-13T17:55:39+0200",
          tags: ["bug"],
          comments: [
            {
              key: "7d7c56f5-7b5a-41b9-87f8-36fa70caa5ba",
              login: "john.smith",
              htmlText: 'Must be "public"!',
              markdown: 'Must be "public"!',
              updatable: false,
              createdAt: "2013-05-13T18:08:34+0200",
            },
          ],
          attr: {
            "jira-issue-key": "SONAR-1234",
          },
          transitions: ["reopen"],
          actions: ["comment"],
          textRange: {
            startLine: 1,
            endLine: 5,
            startOffset: 0,
            endOffset: 32,
          },
          flows: [
            {
              locations: [
                {
                  textRange: {
                    startLine: 16,
                    endLine: 16,
                    startOffset: 0,
                    endOffset: 30,
                  },
                  msg: "Expected position: 5",
                  msgFormattings: [
                    {
                      start: 0,
                      end: 4,
                      type: "CODE",
                    },
                  ],
                },
              ],
            },
            {
              locations: [
                {
                  textRange: {
                    startLine: 15,
                    endLine: 15,
                    startOffset: 0,
                    endOffset: 37,
                  },
                  msg: "Expected position: 6",
                  msgFormattings: [],
                },
              ],
            },
          ],
          quickFixAvailable: false,
          ruleDescriptionContextKey: "spring",
          codeVariants: ["windows", "linux"],
        },
        {
          key: "01fc972e-2a3c-433e-bcae-0bd7f88f5123",
          component:
            "com.github.kevinsawicki:http-request:com.github.kevinsawicki.http.HttpRequest",
          project: "com.github.kevinsawicki:http-request",
          rule: "java:S1144",
          cleanCodeAttribute: "CLEAR",
          cleanCodeAttributeCategory: "INTENTIONAL",
          issueStatus: "ACCEPTED",
          impacts: [
            {
              softwareQuality: "SECURITY",
              severity: "HIGH",
            },
          ],
          message: "Code smell due to mistake here.",
          messageFormattings: [
            {
              start: 0,
              end: 4,
              type: "CODE",
            },
          ],
          line: 81,
          hash: "a227e508d6646b55a086ee11d63b21e9",
          author: "Developer 1",
          effort: "2h1min",
          creationDate: "2013-05-13T17:55:39+0200",
          updateDate: "2013-05-13T17:55:39+0200",
          tags: ["bug"],
          comments: [
            {
              key: "7d7c56f5-7b5a-41b9-87f8-36fa70caa5ba",
              login: "john.smith",
              htmlText: 'Must be "public"!',
              markdown: 'Must be "public"!',
              updatable: false,
              createdAt: "2013-05-13T18:08:34+0200",
            },
          ],
          attr: {
            "jira-issue-key": "SONAR-1234",
          },
          transitions: ["reopen"],
          actions: ["comment"],
          textRange: {
            startLine: 30,
            endLine: 35,
            startOffset: 0,
            endOffset: 32,
          },
          flows: [
            {
              locations: [
                {
                  textRange: {
                    startLine: 16,
                    endLine: 16,
                    startOffset: 0,
                    endOffset: 30,
                  },
                  msg: "Expected position: 5",
                  msgFormattings: [
                    {
                      start: 0,
                      end: 4,
                      type: "CODE",
                    },
                  ],
                },
              ],
            },
            {
              locations: [
                {
                  textRange: {
                    startLine: 15,
                    endLine: 15,
                    startOffset: 0,
                    endOffset: 37,
                  },
                  msg: "Expected position: 6",
                  msgFormattings: [],
                },
              ],
            },
          ],
          quickFixAvailable: false,
          ruleDescriptionContextKey: "spring",
          codeVariants: ["windows", "linux"],
        },
      ],
      components: [
        {
          key: "com.github.kevinsawicki:http-request:src/main/java/com/github/kevinsawicki/http/HttpRequest.java",
          enabled: true,
          qualifier: "FIL",
          name: "HttpRequest.java",
          longName:
            "src/main/java/com/github/kevinsawicki/http/HttpRequest.java",
          path: "src/main/java/com/github/kevinsawicki/http/HttpRequest.java",
        },
        {
          key: "com.github.kevinsawicki:http-request",
          enabled: true,
          qualifier: "TRK",
          name: "http-request",
          longName: "http-request",
        },
      ],
      rules: [
        {
          key: "java:S1144",
          name: 'Unused "private" methods should be removed',
          status: "READY",
          lang: "java",
          langName: "Java",
        },
      ],
    };

    setIssues(sonarQubeData.issues.map((data) => new SonarQubeIssue(data)));
    //console.log("Inside fetchdata");
   // console.log(sonarQubeData.issues);
    //console.log("After sonarQubeData");
    // console.log(issues);
  };
  const toggleSwitch = () => {
    setDarkMode(!isDarkMode);
  };
  const getLineStyle = (isLineHovered, isDarkMode, lineNumber) => {
    // Default styles for dark mode or light mode
    let style = isDarkMode ? {
        background: "#333333",
        color: "#dddddd",
        boxShadow: "none",
        borderRadius: "0px",
        borderWidth: "3px",
        borderColor: "#aaaaaa",
    } : {
        background: "#ffffff",
        color: "#a50bf6",
        boxShadow: "0px 0px 8px 7px rgba(0, 0, 0, 0.2)",
        borderRadius: "0px",
        borderWidth: "3px",
        borderColor: "#a50bf6",
    };

    // Modify styles if the line is hovered
    if (isLineHovered) {
        style = {
            ...style,
            background: isDarkMode ? "linear-gradient(to right, #555, #777, #999)" : "linear-gradient(to right, #FFB6C1, #FFC0CB, #FF69B4)",
            color: isDarkMode ? "#ffffff" : "#000000",
            borderColor: isDarkMode ? "#ffffff" : "#FF69B4",
        };
    }
    
    if (selectedActiveBubble && lineNumber >= selectedActiveBubble.startLine && lineNumber <= selectedActiveBubble.endLine) {
      // Apply glowing effect for active issue lines
      style = {
        ...style,
        background: isDarkMode ? "linear-gradient(to right, #555, #777, #999)" : "linear-gradient(to right, #FFB6C1, #FFC0CB, #FF69B4)",
        color: isDarkMode ? "#ffffff" : "#000000",
        borderColor: isDarkMode ? "#ffffff" : "#FF69B4",
    };
    }
    return style;
};



  const customLineProps = (lineNumber) => {
    //console.log("inside customLineProps");
    let props = {}; // Initialize props object to potentially include style and event handlers
    let selectedissuehighlight = {};
    const style = { backgroundColor: "rgba(255, 0, 0, 0.3)" }; // Default style for issues
    let isLineRelatedToActiveBubble = false;

    if (selectedActiveBubble && lineNumber >= selectedActiveBubble.startLine && lineNumber <= selectedActiveBubble.endLine) {
      // Apply glowing effect for active issue lines
      style.backgroundColor = "rgba(255, 215, 0, 0.5)"; 
      style.cursor = "pointer"; // Add cursor pointer to indicate clickable
    } else {
      // Default style for lines not related to the active bubble but might still have issues
      style.backgroundColor = "rgba(255, 0, 0, 0.3)";
    }
  
    for (const issue of issues) {
      // Check if there's an active issue and the current line is within its range
      if ( activeIssue && lineNumber >= activeIssue.startLine && lineNumber <= activeIssue.endLine) {
        // Apply highlight style for these lines

        style.className = 'line-highlight'; // Apply highlighting class

        style.backgroundColor = "rgba(0, 255, 0, 1)"; // Green background for active issue lines
      }
     
      if (lineNumber >= issue.startLine && lineNumber <= issue.endLine) {
        // Found an issue for this line, apply styles and event handlers
        const explanation = issue.message; // Assuming the explanation is in `message`
        const isLineHovered = lineNumber === hoveredLine;

        // Enhance style for hovered line
        if (isLineHovered) {
          style.cursor = "pointer";
          style.backgroundColor = "rgba(255, 0, 0, 0.4)"; // Darker on hover
        }

        // Attach event handlers only for lines with issues
        props = {
          style: getLineStyle(isLineHovered, isDarkMode, lineNumber),
          selectedissuehighlight,
          onMouseEnter: () => setHoveredLine(lineNumber),
          onMouseLeave: () => setHoveredLine(null),
          onClick: () => handleLineClick(lineNumber, explanation, issue),
        };
        break; // No need to check further issues
      }
    }
    // For lines without issues, props will be an empty object, thus not attaching any event handlers
    return props;
  };

  const handleFileDownload = () => {};
  
  
  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem('jwtToken');
        if (!token) {
          console.error("Authentication token not found. Please log in.");
          return; // Exit if no token is found
        }
        console.log("The token");

        console.log(token);
            const response = await fetch('http://localhost:8080/codeanalysis/getAnalysis', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json(); // or response.json() if the output is JSON
            //setIssues(result);
            console.log(result);
            //sonarQubeData.issues.map((data) => new SonarQubeIssue(data))
        } catch (e) {
            setError(e.message);
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, []); 
  
  useEffect(() => {
    applyTextGradient("headerText", ["#2B0AFF", "#C307F9"]);

    fetchData();
  }, []);

  useEffect(() => {
    fetch(pythonCode)
      .then((response) => response.text())
      .then((text) => setStudentCode(text));
  }, []);

  function applyTextGradient(elementId, colors) {
    var element = document.getElementById(elementId);
    if (element) {
      element.style.background = `linear-gradient(to right, ${colors.join(
        ", "
      )})`;
      element.style.webkitBackgroundClip = "text";
      element.style.color = "transparent";
      element.style.display = "inline-block";
    }
  }
  const switchStyle = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: isDarkMode ? "flex-start" : "flex-end",
      width: "100px", // Adjust width as necessary
      height: "40px", // Adjust height as necessary
      background: isDarkMode
        ? `linear-gradient(to right, #C307F9, #EA38C1, #FB8F8B)`
        : "#bbbbbb",
      borderRadius: "20px",
      padding: "5px",
      transition: "background-color 0.3s",
      cursor: "pointer",
      position: "relative", // Added for absolute positioning of the label
      fontSize: "12px",
      marginLeft: "220px", // Adjust font size as necessary
    },
    toggle: {
      width: "30px", // Adjust knob size as necessary
      height: "30px", // Adjust knob size as necessary
      background: "#ffffff",
      borderRadius: "50%",
      position: "absolute",
      transition: "left 0.3s",
      left: isDarkMode ? "60px" : "10px", // Adjust left position as necessary
    },
    label: {
      position: "absolute",
      color: "#ffffff",
      fontWeight: "bold",
    },
    labelOn: {
      left: "10px", // Adjust label position as necessary
    },
    labelOff: {
      right: "10px", // Adjust label position as necessary
    },
  };

  const containerStyles = {
    backgroundColor: isDarkMode ? "#121212" : "#FFFFFF", // #FFFFFF is just an example for light mode
    color: isDarkMode ? "#FFFFFF" : "#000000", // You might want to change the text color as well
    transition: "background-color 0.3s ease", // Smooth transition for color change
    // ... any other styles you want to apply globally
  };
  const handleLineClick = (lineNumber, explanation, issue) => {
    console.log("clicked");
    setSelectedLine(lineNumber);
    setExplanation(explanation);
    const relevantIssue = issues.find(
      (issue) => lineNumber >= issue.startLine && lineNumber <= issue.endLine
    );
    setActiveIssue(relevantIssue);
    // Determine if the clicked line is within the range of an existing bubble
    const existingBubbleIndex = bubbles.findIndex(
      (bubble) =>
        lineNumber >= bubble.issue.startLine &&
        lineNumber <= bubble.issue.endLine
    );

    // Assuming existingBubbleIndex identifies the bubble to be moved to the middle
    if (existingBubbleIndex !== -1) {
      // Step 1: Remove the existing bubble and store it
      const existingBubble = bubbles[existingBubbleIndex];
      const bubblesWithoutExisting = bubbles.filter(
        (_, index) => index !== existingBubbleIndex
      );

      // Step 2: Calculate the new middle index
      const middleIndex = Math.floor(bubblesWithoutExisting.length / 2);

      // Step 3: Insert the existing bubble into the middle of the new array
      bubblesWithoutExisting.splice(middleIndex, 0, existingBubble);

      // Update the bubbles state with this new array
      setBubbles(bubblesWithoutExisting);

      console.log("The updated bubble value:");
      console.log(bubblesWithoutExisting);
    } else {
      // No existing bubble for this line, create a new one
      console.log("Creating new bubble...");
      
      setBubbles((prevBubbles) => [
        ...prevBubbles,
        {
          id: bubbles.length + 1, // Simple ID generation, consider using something like UUID in a real app
          line: lineNumber,
          type: "Error",
          content: explanation,
          issue: issue
      }
      ]);
    }
  };
  const mainContentWidth = `calc(100% - ${sidebarWidth}px)`;
  const handleBubbleClick = (id) => {
    const clickedBubble = bubbles.find(bubble => bubble.id === id);
    if(clickedBubble) {
      setSelectedActiveBubble({
            startLine: clickedBubble.issue.startLine,
            endLine: clickedBubble.issue.endLine
        });
        setSelectedBubbleId(id); // Keep track of the selected bubble
        console.log("startline ");
        console.log(clickedBubble.issue.startLine);

        console.log("endline ");
        console.log(clickedBubble.issue.endLine);


    } else {
        // If for some reason the bubble isn't found, clear the active issue
        setSelectedActiveBubble(null);
    }
};



  const handleCloseBubble = (id) => {
    // Close bubble logic here
    setBubbles(bubbles.filter(bubble => bubble.id !== id));
    if (selectedBubbleId === id) {
        setSelectedBubbleId(null); // Deselect bubble if it's being closed
    }
};

  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
      />
      <title>Code Analysis Results</title>
      <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Raleway:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&display=swap"
      />
      <link
        rel="stylesheet"
        href="assets/css/Drag-Drop-File-Input-Upload.css"
      />
      <div style={containerStyles}>
        {" "}
        <NavBar isDarkMode={isDarkMode} activeSection="dashboard" />
        <section className="py-5 mt-5">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-8 col-xl-6 text-center mx-auto">
                <h2 className="display-6 fw-bold mb-4">
                  Code Analysis Results
                </h2>
              </div>
            </div>
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <h2 className="display-6 fw-bold mb-4" />
              <div className="d-flex align-items-center justify-content-start">
                <h2 className="display-10 fw-bold mb-1">Dark Mode</h2>
                <div style={switchStyle.container} onClick={toggleSwitch}>
                  <div
                    style={{
                      ...switchStyle.label,
                      ...(isDarkMode
                        ? switchStyle.labelOn
                        : switchStyle.labelOff),
                    }}
                  >
                    {isDarkMode ? "Dark" : "Light"}
                  </div>
                  <div style={switchStyle.toggle} />
                </div>
              </div>

              <p>
                <br />
                Lab2_Strings_Section3_10Oct.pdf &nbsp; &nbsp; &nbsp;{" "}
                <button
                  className="btn btn-primary shadow"
                  role="button"
                  onMouseEnter={() => setDownloadButtonHovered(true)}
                  onMouseLeave={() => setDownloadButtonHovered(false)}
                  style={{
                    background: downloadButtonHovered
                      ? `linear-gradient(to right, #C307F9, #EA38C1,  #FB8F8B)`
                      : "#ffffff",
                    color: downloadButtonHovered ? "#ffffff" : "#a50bf6",
                    boxShadow:
                      "0px 0px 8px 7px var(--bs-navbar-active-color), 0px 0px",
                    borderRadius: 13,
                    borderWidth: 3,
                    borderColor: downloadButtonHovered ? "#ffffff" : "#a50bf6",
                  }}
                  onClick={handleFileDownload}
                >
                  Download
                </button>
              </p>

              <div />
            </div>

            <div className={isDarkMode ? "dark-mode" : "light-mode"}>
              
            <div className="code-explanation-container" style={{ width: mainContentWidth }}>
              <div>
             
                <SyntaxHighlighter
                  language="python"
                  style={isDarkMode ? dark : prism} // Set the style based on isDarkMode
                  wrapLines={true}
                  showLineNumbers={true}
                  lineProps={(lineNumber) => customLineProps(lineNumber)}
                >
                  {studentCode}
                </SyntaxHighlighter>
                </div>
              </div>
              <div className="bubbles-container" style={{ position: 'absolute', right: '20px', top: '100px' }}>
                {bubbles.map((bubble, index) => (
                    <Bubble
                        key={bubble.id}
                        id={bubble.id}
                        title={bubble.title}
                        content={bubble.content}
                        issue={bubble.issue}
                        onClose={() => handleCloseBubble(bubble.id)}
                        isSelected={bubble.id === selectedBubbleId}
                        onClick={handleBubbleClick}
                        isDarkMode={isDarkMode}
                    />
                ))}
            </div>

            </div>
            
          </div>
        </section>
      </div>
    </>
  );
};

export default CodeAnalysis;
