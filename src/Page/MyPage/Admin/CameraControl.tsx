import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const CameraControl = () => {
  // 페이지에 보여줄 시간
  const [timer, setTimer] = useState(0);

  // 구역 ID
  const fieldId = 0;
  const [socket, setSocket] = useState<Socket | null>(null);

  // 사용자가 설정한 시간
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');

    setSocket(newSocket);
    setDuration(2000);

    newSocket.emit('join', fieldId, (err: any) => {
      if (err) console.log(err);
    });

    // newSocket.emit('join_court', fieldId);

    // const handleUpdateTimer = (data: any) => {
    //   if (data.fieldId === fieldId) {
    //     setTimer(data.time);
    //   }
    // };

    newSocket.on('update_timer', (remainingTime: number) => {
      setTimer(remainingTime);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [fieldId]);

  const startTimer = () => {
    if (socket) {
      // socket이 null이 아닐 때만 emit 호출
      socket.emit('start_timer', { fieldId, duration });
    }
  };

  // 타이머 형식 00 : 00
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>{formatTime(timer)}</h1>
      <button onClick={startTimer} style={{ color: 'white' }}>
        Start Timer
      </button>
    </div>
  );
};

export default CameraControl;
