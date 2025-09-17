import React from "react";

const flaggedData = [
  { question: "How to implement AI in web development?", reason: "Inappropriate content", user: "Aarav Sharma", date: "2024-01-15" },
  { question: "Best practices for data science projects", reason: "Spam", user: "Ananya Verma", date: "2024-01-16" },
  { question: "Machine learning algorithms for beginners", reason: "Offensive language", user: "Aditya Singh", date: "2024-01-17" },
  { question: "How to optimize React apps?", reason: "Spam", user: "Ishaan Patel", date: "2024-01-18" },
  { question: "Using AI for automated testing", reason: "Inappropriate content", user: "Aanya Reddy", date: "2024-01-19" },
  { question: "Best practices for Python scripts", reason: "Offensive language", user: "Vihaan Gupta", date: "2024-01-20" },
  { question: "Deploying Node.js apps on AWS", reason: "Spam", user: "Saanvi Mehta", date: "2024-01-21" },
  { question: "React vs Angular performance comparison", reason: "Inappropriate content", user: "Kabir Iyer", date: "2024-01-22" },
  { question: "Top tools for CI/CD pipelines", reason: "Spam", user: "Diya Nair", date: "2024-01-23" },
  { question: "Unit testing in Java using JUnit", reason: "Offensive language", user: "Arjun Joshi", date: "2024-01-24" },
  { question: "Best cloud practices for SaaS apps", reason: "Inappropriate content", user: "Anika Choudhary", date: "2024-01-25" },
  { question: "Using Docker and Kubernetes in dev environments", reason: "Spam", user: "Rohan Malhotra", date: "2024-01-26" },
  { question: "Python vs Java for backend development", reason: "Offensive language", user: "Myra Kapoor", date: "2024-01-27" },
  { question: "Implementing GraphQL APIs", reason: "Spam", user: "Sai Raghavan", date: "2024-01-28" },
  { question: "Optimizing SQL queries for large datasets", reason: "Inappropriate content", user: "Aadhya Bansal", date: "2024-01-29" },
  { question: "AWS Lambda vs Azure Functions", reason: "Spam", user: "Aryan Desai", date: "2024-01-30" },
  { question: "Test automation frameworks for web apps", reason: "Offensive language", user: "Tanvi Kulkarni", date: "2024-02-01" },
  { question: "Microservices architecture pros and cons", reason: "Spam", user: "Krishna Nanda", date: "2024-02-02" },
  { question: "Debugging production issues in Node.js", reason: "Inappropriate content", user: "Mira Dutta", date: "2024-02-03" },
  { question: "Cloud security best practices", reason: "Spam", user: "Dev Chatterjee", date: "2024-02-04" },
  { question: "Setting up CI/CD for Python projects", reason: "Offensive language", user: "Shreya Sinha", date: "2024-02-05" },
  { question: "Serverless architecture use cases", reason: "Spam", user: "Raghav Menon", date: "2024-02-06" },
  { question: "React hooks vs class components", reason: "Inappropriate content", user: "Tanya Saxena", date: "2024-02-07" },
  { question: "Using Terraform for cloud infrastructure", reason: "Spam", user: "Karan Tripathi", date: "2024-02-08" },
  { question: "Best practices for code reviews", reason: "Offensive language", user: "Isha Bhatt", date: "2024-02-09" },
  { question: "Managing API versioning in RESTful services", reason: "Spam", user: "Nikhil Rao", date: "2024-02-10" },
  { question: "End-to-end testing with Cypress", reason: "Inappropriate content", user: "Aarohi Nanda", date: "2024-02-11" },
  { question: "Server monitoring tools for DevOps", reason: "Spam", user: "Yash Mehra", date: "2024-02-12" },
  { question: "Implementing OAuth2 in web applications", reason: "Offensive language", user: "Riya Kapoor", date: "2024-02-13" },
  { question: "Managing Docker containers in production", reason: "Spam", user: "Pranav Singh", date: "2024-02-14" },
  { question: "Kubernetes cluster troubleshooting tips", reason: "Inappropriate content", user: "Anaya Verma", date: "2024-02-15" },
  { question: "Agile vs Scrum for software teams", reason: "Spam", user: "Siddharth Iyer", date: "2024-02-16" },
  { question: "Integrating Jenkins with GitHub", reason: "Offensive language", user: "Pooja Reddy", date: "2024-02-17" },
  { question: "Performance tuning in MySQL", reason: "Spam", user: "Manav Gupta", date: "2024-02-18" },
  { question: "CI/CD for mobile applications", reason: "Inappropriate content", user: "Naina Choudhary", date: "2024-02-19" },
  { question: "Cloud cost optimization strategies", reason: "Spam", user: "Harsh Malhotra", date: "2024-02-20" },
  { question: "Monitoring serverless functions", reason: "Offensive language", user: "Kiara Dutta", date: "2024-02-21" },
];


const ModerationTools = ({ limit }) => {
  // Apply limit if provided
  const displayedData = limit ? flaggedData.slice(0, limit) : flaggedData;

  return (
    <div className="mb-4">
      <h2 className="h5 fw-bold text-dark mb-3">Moderation Tools</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Question/Answer</th>
              <th>Flag Reason</th>
              <th>User</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((item, index) => (
              <tr key={index}>
                <td>{item.question}</td>
                <td>
                  <span className="badge bg-warning text-dark">{item.reason}</span>
                </td>
                <td>{item.user}</td>
                <td>{item.date}</td>
                <td>
                  <button className="btn btn-success btn-sm me-2 rounded-pill">
                    Approve
                  </button>
                  <button className="btn btn-danger btn-sm rounded-pill">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModerationTools;
