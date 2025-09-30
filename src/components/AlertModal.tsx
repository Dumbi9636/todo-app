// src/components/AlertModal.tsx

import { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';

/*
    show : Modal 을 띄울지 여부 (boolean)
    message : Modal 메세지 (string)
    onYes : Modal 의 확인 버튼을 눌렀을때 호출될 함수 (function)
*/

// props 의 type 을 미리 정의한다 
interface AlertModalProps{
    show:boolean;
    message:string;
    onYes:()=>void;
}

/*
    const 함수명:type = ( ) =>{ }
    함수명 - AlertModal
    함수의 type - FC<AlertModalProps>
    함수에 전달되는 props 의 type - AlertModalProps
    컴포넌트가 리턴해주는 함수의 type - FC 
*/
const AlertModal:FC<AlertModalProps> = ({show, message, onYes}) => {

    return (
        <Modal show={show}>
            <Modal.Header>알림</Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' onClick={onYes}>확인</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AlertModal;
