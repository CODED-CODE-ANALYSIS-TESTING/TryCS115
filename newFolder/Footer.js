import React from 'react';
import './footer.css';

export const Footer = () => {
    return (
        <footer
            className="custom-footer"
            style={{
                background: "#ffffff",
                color: "#1d0042",
                boxShadow: "0px 0px 13px 2px #bec1de",
                padding: "10px 0", // Reduce vertical padding
                marginTop: "0px", // Add some margin to push it up
            }}
        >
            <div className="container py-2 py-lg-3"> {/* Reduce vertical padding here */}
                <div className="row row-cols-2 row-cols-md-4">
                    <div className="col-12 col-md-3">
                        <div className="fw-bold d-flex align-items-center mb-2">
                            <span>CODED.</span>
                        </div>
                        <p className="text-muted">
                            Your virtual lab tutor.
                        </p>
                    </div>
                </div>
                <hr />
                <div className="text-muted d-flex justify-content-between align-items-center pt-2"> {/* Reduce padding top here */}
                    <p className="mb-0">Copyright © 2023 CODED.</p>
                    <ul className="list-inline mb-0">
                        <li className="list-inline-item">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                className="bi bi-facebook"
                            >
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                            </svg>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
