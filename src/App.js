import React, { useState, useEffect } from 'react';

const HomeworkApp = () => {
  const [homeworks, setHomeworks] = useState([]);
  const [newHomework, setNewHomework] = useState({
    subject: '',
    topic: '',
    deadline: '',
    details: '',
    status: 'ยังไม่เสร็จ',
  });

  useEffect(() => {
    const storedHomeworks = JSON.parse(localStorage.getItem('homeworks'));
    if (storedHomeworks) {
      setHomeworks(storedHomeworks);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHomework({ ...newHomework, [name]: value });
  };

  const handleAddHomework = () => {
    if(!newHomework.subject){
      alert('กรุณากรอกเรื่อง!');
    }else if(!newHomework.topic){
      alert('กรุณากรอกวิชา!');
    }else if(!newHomework.deadline){
      alert('กรุณากรอกวันที่กำหนดส่ง!');
    }else if(!newHomework.details){
      alert('กรุณากรอกรายละเอียด!');
    }else{
    const updatedHomeworks = [...homeworks, newHomework];
    setHomeworks(updatedHomeworks);
    localStorage.setItem('homeworks', JSON.stringify(updatedHomeworks));
    setNewHomework({
      subject: '',
      topic: '',
      deadline: '',
      details: '',
      status: 'ยังไม่เสร็จ',
    });
  }
  };

  const handleDeleteHomework = (index) => {
    const updatedHomeworks = homeworks.filter((_, i) => i !== index);
    setHomeworks(updatedHomeworks);
    localStorage.setItem('homeworks', JSON.stringify(updatedHomeworks));
  };

  const handleUpdateStatus = (index, newStatus) => {
    const updatedHomeworks = [...homeworks];
    updatedHomeworks[index].status = newStatus;
    setHomeworks(updatedHomeworks);
    localStorage.setItem('homeworks', JSON.stringify(updatedHomeworks));
  };

  return (
    <div className='container'>
      <h1 className='text-center mt-3'>ระบบบันทึกการบ้าน</h1>
      <div>
        <label>เรื่อง</label>
        <input
          type="text"
          name="subject"
          className="form-control"
          value={newHomework.subject}
          onChange={handleInputChange}
          placeholder="เรื่อง"
        />
        <label>วิชา</label>
        <input
          type="text"
          name="topic"
          className="form-control"
          value={newHomework.topic}
          onChange={handleInputChange}
          placeholder="วิชา"
        />
        <label>วันที่กำหนดส่ง</label>
        <input
          type="datetime-local"
          name="deadline"
          className="form-control"
          value={newHomework.deadline}
          onChange={handleInputChange}
          placeholder="วันที่กำหนดส่ง"
        />
        <label>รายละเอียด</label>
        <input
          type="text"
          name="details"
          className="form-control"
          value={newHomework.details}
          onChange={handleInputChange}
          placeholder="รายละเอียด"
          required
        />
        <div className='mt-3 mb-3 ' style={{textAlign:'center'}} >
        <button className='btn btn-primary' onClick={handleAddHomework}>+เพิ่ม</button>
        </div>
      </div>
      <ul>
        {homeworks.map((homework, index) => (
          <li key={index}>
            <div>{`เรื่อง: ${homework.subject}`}</div>
            <div>{`วิชา: ${homework.topic}`}</div>
            <div>{`วันที่กำหนดส่ง: ${homework.deadline}`}</div>
            <div>{`รายละเอียด: ${homework.details}`}</div>
            <div>{`สถานะ: ${homework.status}`}</div>
            {homework.status ==='ยังไม่เสร็จ'?
            <button className='btn btn-success' onClick={() => handleUpdateStatus(index, 'เสร็จแล้ว')}>
              ทำเครื่องหมายทำแล้ว
            </button>
            :null}
            <button className='btn btn-danger' onClick={() => handleDeleteHomework(index)}>ลบ</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeworkApp;
