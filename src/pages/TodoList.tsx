// src/pages/TodoList.tsx

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function TodoList() {
  // 상태값 관리 (반드시 컴포넌트 안쪽에!)
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [t, setT] = useState("");
  const [list, setList] = useState<any[]>([]); // Todo 목록

  // 목록 불러오기
  const load = async () => {
    const data = await window.api.getTodoList(); // main process에서 getTodos 구현해야 함
    setList(data);
  };

  // 저장 버튼 눌렀을 때 실행
  const handleSave = async () => {
    const isSuccess = await window.api.addTodo(title, comment, t);
    if (isSuccess) {
      alert("추가 성공!");
      setTitle("");
      setComment("");
      setT("");
      load(); // 목록 다시 불러오기
    } else {
      alert("추가 실패");
    }
  };

  // 첫 렌더링 시 목록 불러오기
  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <h1 className="mb-4">✅ Todo List</h1>

        {/* 입력 폼 */}
        <div className="card p-3 mb-4">
          <div className="mb-3">
            <label className="form-label">제목</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">코멘트</label>
            <input
              type="text"
              className="form-control"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">만료일</label>
            <input
              type="text"
              className="form-control"
              value={t}
              onChange={(e) => setT(e.target.value)}
            />
          </div>

          <button onClick={handleSave} className="btn btn-dark">
            추가하기
          </button>
        </div>

        {/* 목록 출력 */}
        <ul className="list-group mb-3">
          {list.map((item, index) => (
            <li key={index} className="list-group-item">
              <h5>{item.title}</h5>
              <p className="mb-1">{item.comment}</p>
              <small className="text-muted">t: {item.t}</small>
            </li>
          ))}
        </ul>

        <NavLink to="/" className="btn btn-outline-secondary">
          뒤로가기
        </NavLink>
      </div>
    </>
  );
}

export default TodoList;
