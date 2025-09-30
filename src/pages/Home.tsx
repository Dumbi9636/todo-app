// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { Todo } from "../../electron/types/types"; // 타입 가져오기
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";

function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.api.getTodoList().then(setTodos);
  }, []);

  
  const pendingCount = todos.filter(t => t.status !== "done").length;
  const doneCount = todos.filter(t => t.status === "done").length;

  return (
    <div className="container mt-3">
      <h1 className="mb-4"> <i className="bi bi-calendar-check me-2"></i> Todo App</h1>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>
                할 일 현황 <Badge bg="secondary">Today</Badge>
              </Card.Title>
              <Card.Text>
                남은 할 일: <b>{pendingCount}</b> 개 <br />
                완료된 할 일: <b>{doneCount}</b> 개
              </Card.Text>
              <Button variant="dark" onClick={() => navigate("/todos")}>
                Todo 목록 보기
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>새로운 할 일 추가</Card.Title>
              <Card.Text>오늘 해야 할 일을 추가해보세요!</Card.Text>
              <Button
                variant="outline-dark"
                onClick={() => navigate("/todos")}
              >
                추가하러 가기
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;