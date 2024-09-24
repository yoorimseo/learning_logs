import { useEffect, useState } from 'react';

export default function ProgressBar({ timer }) {
  // 사용자에게 타이머가 설정되어 있다는 것과 타이머가 만료되면 항목이 삭제될 예정이라고 알려주는 기능 추가
  const [remaininngTime, setRemaininngTime] = useState(timer);

  // 무한루프 방지를 위해 useEffect 사용
  useEffect(() => {
    const interval = setInterval(() => {
      setRemaininngTime((prevTime) => prevTime - 10);
    }, 10);

    // 해당 컴포넌트가 사라져도 setInterval 함수가 끝나지 않는 것을 방지하기 위해 추가
    // 이것은 해당 앱의 성능에 영향을 주지 않기 위함
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      value={remaininngTime}
      max={timer}
    />
  );
}
