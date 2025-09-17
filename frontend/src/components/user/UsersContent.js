import React, { useState } from "react";
import UserCard from "./UserCard";
import { Container, Row, Col, Form, InputGroup, Pagination } from "react-bootstrap";
import { Search } from "lucide-react";

export default function UsersContent() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 25;

   // dummy users data
const users = [
  { id: 1, name: "Aarav Sharma", designation: "Software Engineer", score: 480, avatar: "https://i.pravatar.cc/48?img=1", tags: ["javascript", "react", "nodejs"] },
  { id: 2, name: "Ishaan Patel", designation: "Frontend Developer", score: 430, avatar: "https://i.pravatar.cc/48?img=2", tags: ["html", "css", "vue"] },
  { id: 3, name: "Vihaan Kapoor", designation: "Backend Developer", score: 420, avatar: "https://i.pravatar.cc/48?img=3", tags: ["java", "spring", "sql"] },
  { id: 4, name: "Ananya Singh", designation: "Fullstack Developer", score: 500, avatar: "https://i.pravatar.cc/48?img=4", tags: ["react", "nodejs", "mongodb"] },
  { id: 5, name: "Rohan Verma", designation: "Cloud Engineer", score: 410, avatar: "https://i.pravatar.cc/48?img=5", tags: ["aws", "docker", "kubernetes"] },
  { id: 6, name: "Saanvi Joshi", designation: "QA Engineer", score: 390, avatar: "https://i.pravatar.cc/48?img=6", tags: ["selenium", "cypress", "automation"] },
  { id: 7, name: "Arjun Mehta", designation: "DevOps Engineer", score: 450, avatar: "https://i.pravatar.cc/48?img=7", tags: ["jenkins", "ansible", "terraform"] },
  { id: 8, name: "Aditi Reddy", designation: "Data Scientist", score: 470, avatar: "https://i.pravatar.cc/48?img=8", tags: ["python", "pandas", "tensorflow"] },
  { id: 9, name: "Kabir Nair", designation: "Machine Learning Engineer", score: 460, avatar: "https://i.pravatar.cc/48?img=9", tags: ["ml", "python", "scikit-learn"] },
  { id: 10, name: "Tanya Iyer", designation: "UI/UX Designer", score: 380, avatar: "https://i.pravatar.cc/48?img=10", tags: ["figma", "adobe xd", "css"] },
  { id: 11, name: "Aditya Bansal", designation: "Backend Developer", score: 420, avatar: "https://i.pravatar.cc/48?img=11", tags: ["nodejs", "express", "mongodb"] },
  { id: 12, name: "Meera Nambiar", designation: "Frontend Developer", score: 400, avatar: "https://i.pravatar.cc/48?img=12", tags: ["react", "typescript", "scss"] },
  { id: 13, name: "Devansh Khanna", designation: "Software Architect", score: 510, avatar: "https://i.pravatar.cc/48?img=13", tags: ["java", "springboot", "microservices"] },
  { id: 14, name: "Anika Chauhan", designation: "Data Analyst", score: 395, avatar: "https://i.pravatar.cc/48?img=14", tags: ["sql", "excel", "tableau"] },
  { id: 15, name: "Vivaan Malhotra", designation: "Cloud Consultant", score: 445, avatar: "https://i.pravatar.cc/48?img=15", tags: ["azure", "aws", "gcp"] },
  { id: 16, name: "Riya Sharma", designation: "Mobile Developer", score: 410, avatar: "https://i.pravatar.cc/48?img=16", tags: ["flutter", "dart", "android"] },
  { id: 17, name: "Karan Joshi", designation: "DevOps Engineer", score: 430, avatar: "https://i.pravatar.cc/48?img=17", tags: ["docker", "kubernetes", "ci/cd"] },
  { id: 18, name: "Sakshi Gupta", designation: "QA Engineer", score: 385, avatar: "https://i.pravatar.cc/48?img=18", tags: ["selenium", "postman", "cypress"] },
  { id: 19, name: "Aryan Reddy", designation: "Software Engineer", score: 470, avatar: "https://i.pravatar.cc/48?img=19", tags: ["javascript", "react", "nodejs"] },
  { id: 20, name: "Priya Verma", designation: "Frontend Developer", score: 400, avatar: "https://i.pravatar.cc/48?img=20", tags: ["html", "css", "vue"] },
  { id: 21, name: "Shaurya Kapoor", designation: "Backend Developer", score: 450, avatar: "https://i.pravatar.cc/48?img=21", tags: ["python", "django", "sql"] },
  { id: 22, name: "Isha Jain", designation: "UI/UX Designer", score: 375, avatar: "https://i.pravatar.cc/48?img=22", tags: ["figma", "adobe xd", "css"] },
  { id: 23, name: "Lakshya Malhotra", designation: "Machine Learning Engineer", score: 460, avatar: "https://i.pravatar.cc/48?img=23", tags: ["ml", "tensorflow", "python"] },
  { id: 24, name: "Anvi Bhatt", designation: "Data Scientist", score: 485, avatar: "https://i.pravatar.cc/48?img=24", tags: ["python", "pandas", "numpy"] },
  { id: 25, name: "Ritvik Nair", designation: "Cloud Engineer", score: 420, avatar: "https://i.pravatar.cc/48?img=25", tags: ["aws", "terraform", "docker"] },
  { id: 26, name: "Myra Choudhary", designation: "Fullstack Developer", score: 500, avatar: "https://i.pravatar.cc/48?img=26", tags: ["react", "nodejs", "graphql"] },
  { id: 27, name: "Advik Sinha", designation: "Software Engineer", score: 460, avatar: "https://i.pravatar.cc/48?img=27", tags: ["java", "spring", "microservices"] },
  { id: 28, name: "Prisha Agarwal", designation: "QA Engineer", score: 390, avatar: "https://i.pravatar.cc/48?img=28", tags: ["cypress", "selenium", "postman"] },
  { id: 29, name: "Devika Sharma", designation: "Frontend Developer", score: 405, avatar: "https://i.pravatar.cc/48?img=29", tags: ["react", "typescript", "scss"] },
  { id: 30, name: "Raghav Mehta", designation: "Backend Developer", score: 440, avatar: "https://i.pravatar.cc/48?img=30", tags: ["nodejs", "express", "mongodb"] },
  { id: 31, name: "Tara Kapoor", designation: "UI/UX Designer", score: 370, avatar: "https://i.pravatar.cc/48?img=31", tags: ["figma", "css", "adobe xd"] },
  { id: 32, name: "Mihir Chatterjee", designation: "Software Engineer", score: 460, avatar: "https://i.pravatar.cc/48?img=32", tags: ["golang", "docker", "kubernetes"] },
  { id: 33, name: "Navya Menon", designation: "Frontend Developer", score: 395, avatar: "https://i.pravatar.cc/48?img=33", tags: ["angular", "typescript", "rxjs"] },
  { id: 34, name: "Parth Desai", designation: "Backend Developer", score: 445, avatar: "https://i.pravatar.cc/48?img=34", tags: ["c#", ".net", "sql"] },
  { id: 35, name: "Kiara Malhotra", designation: "Mobile Developer", score: 420, avatar: "https://i.pravatar.cc/48?img=35", tags: ["kotlin", "java", "android"] },
  { id: 36, name: "Reyansh Gupta", designation: "DevOps Engineer", score: 455, avatar: "https://i.pravatar.cc/48?img=36", tags: ["aws", "terraform", "ci/cd"] },
  { id: 37, name: "Jiya Bhatia", designation: "Data Analyst", score: 400, avatar: "https://i.pravatar.cc/48?img=37", tags: ["excel", "powerbi", "sql"] },
  { id: 38, name: "Arya Pillai", designation: "Cloud Engineer", score: 430, avatar: "https://i.pravatar.cc/48?img=38", tags: ["azure", "docker", "kubernetes"] },
  { id: 39, name: "Rudra Saxena", designation: "QA Engineer", score: 390, avatar: "https://i.pravatar.cc/48?img=39", tags: ["junit", "selenium", "cypress"] },
  { id: 40, name: "Samaira Kapoor", designation: "UI/UX Designer", score: 375, avatar: "https://i.pravatar.cc/48?img=40", tags: ["sketch", "figma", "css"] },
  { id: 41, name: "Kavya Nair", designation: "Machine Learning Engineer", score: 470, avatar: "https://i.pravatar.cc/48?img=41", tags: ["pytorch", "deep learning", "python"] },
  { id: 42, name: "Manav Reddy", designation: "Software Engineer", score: 450, avatar: "https://i.pravatar.cc/48?img=42", tags: ["c++", "python", "algorithms"] },
  { id: 43, name: "Zara Khan", designation: "Frontend Developer", score: 405, avatar: "https://i.pravatar.cc/48?img=43", tags: ["svelte", "javascript", "css"] },
  { id: 44, name: "Atharv Sharma", designation: "Backend Developer", score: 440, avatar: "https://i.pravatar.cc/48?img=44", tags: ["php", "laravel", "mysql"] },
  { id: 45, name: "Ira Jain", designation: "Fullstack Developer", score: 495, avatar: "https://i.pravatar.cc/48?img=45", tags: ["react", "django", "graphql"] },
  { id: 46, name: "Yash Raj", designation: "Cloud Engineer", score: 415, avatar: "https://i.pravatar.cc/48?img=46", tags: ["gcp", "kubernetes", "terraform"] },
  { id: 47, name: "Diya Sen", designation: "Data Scientist", score: 480, avatar: "https://i.pravatar.cc/48?img=47", tags: ["python", "scikit-learn", "pandas"] },
  { id: 48, name: "Nivaan Das", designation: "DevOps Engineer", score: 435, avatar: "https://i.pravatar.cc/48?img=48", tags: ["ansible", "jenkins", "docker"] },
  { id: 49, name: "Aarohi Yadav", designation: "QA Engineer", score: 385, avatar: "https://i.pravatar.cc/48?img=49", tags: ["postman", "cypress", "selenium"] },
  { id: 50, name: "Vihaan Mishra", designation: "Frontend Developer", score: 410, avatar: "https://i.pravatar.cc/48?img=50", tags: ["react", "scss", "typescript"] },
  
];

  // Filter users
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.designation.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Container fluid className="py-4 users-page">
      <h4 className="mb-3 heading-text">Users</h4>

      {/* Search Input */}
      <Form className="mb-4">
        <InputGroup>
          <InputGroup.Text className="bg-white border-end-0">
            <Search size={16} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search users by name or designation..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset to page 1 after search
            }}
            className="border-start-0 no-focus-outline"
          />
        </InputGroup>
      </Form>

      {/* User List */}
      <Row className="g-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5">
        {currentUsers.map((user) => (
          <Col key={user.id}>
            <div className="h-100">
              <UserCard user={user} />
            </div>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].slice(0, 5).map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={currentPage === i + 1}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          {totalPages > 5 && <Pagination.Ellipsis disabled />}
          {totalPages > 5 && (
            <Pagination.Item onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </Pagination.Item>
          )}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </Container>
  );
}
