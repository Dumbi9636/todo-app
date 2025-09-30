// electron/types/type.ts

export interface Todo{
    readonly num?: number;   // 자동증가 PK (optional)
  title: string;           // 제목
  comment?: string;        // 메모 (optional)
  type?: string;           // 카테고리 (optional)
  priority?: number;       // 중요도 (0,1,2) (optional)
  status?: "pending" | "in-progress" | "done"; // 상태 (optional)
  rt?: string;             // 등록 시간 (optional)
  t?: string;              // 목표 시간 (optional)
  updatedAt?: string;      // 수정 시간 (optional)
  reminder?: number;       // 알림 여부 (0/1) (optional)
}


