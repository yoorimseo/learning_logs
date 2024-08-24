import { useEffect } from 'react';
import ProgressBar from './ProgressBar';

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // 3초 뒤에 해당 모달이 자동으로 꺼지면서 장소를 자동으로 삭제하는 기능 추가
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div id='delete-confirmation'>
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id='confirmation-actions'>
        <button
          onClick={onCancel}
          className='button-text'
        >
          No
        </button>
        <button
          onClick={onConfirm}
          className='button'
        >
          Yes
        </button>
        <ProgressBar timer={TIMER} />
      </div>
    </div>
  );
}
