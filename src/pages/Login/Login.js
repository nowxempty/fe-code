import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { refreshAccessToken } from '../../tokenmanage.js';
//import {} from './Login_fuc
import './index.css';
//npm run start:windows
//npm run start
function LoginPage({ Id, setId, password, setPassword }) {
  const navigate = useNavigate();

  useEffect(() => { /* 페이지 이동시 input 요소에 저장된 값을 초기화 / 없으면 회원 가입 시 작성한 내용이 적혀져 있다 */
    setId('');
    setPassword('');
    localStorage.removeItem('access_Token');
    checkAccessTokenValidity();
  }, []);

  const LoginClick = () => {
    // POST 요청 보내기
    //https://salgoo9.site/api/login
    post_Login_Data('https://salgoo9.site/api/login', {
      loginId: Id,
      password: password
    });
  };

  const checkAccessTokenValidity = () => {
    // 로컬 스토리지에서 엑세스 토큰 가져오기
    const accessToken = localStorage.getItem('access_Token');
    
    // 엑세스 토큰이 없는 경우
    if (!accessToken) {
        console.log('엑세스 토큰이 없습니다.');
        // 여기에서 로그인 페이지로 이동하거나 다른 처리를 할 수 있습니다.
        navigate('/Login');
        return;
    }
    
    console.log('Access token: ' + accessToken);
  }
  const post_Login_Data = async (url = '', data = {}) => {
    // 데이터 유효성 검사
    if (!data.loginId || !data.password) {
        console.error('아이디와 비밀번호를 모두 입력해주세요.');
        return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(data.loginId)) {
        console.error('아이디는 영문자와 숫자만 허용됩니다.');
        return;
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(data.password)) {
        console.error('비밀번호는 영문자와 숫자를 포함하여 8자리 이상이어야 합니다.');
        return;
    }

    try {
        fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(async response => {
            if (!response.ok) {
                throw new Error('HTTP error, status = ' + response.status);
            }
            // 응답 데이터를 Promise로 반환
            const responseData = await response.json();
            // access_Token 추출
            const access_Token = response.headers.get('access');
            localStorage.setItem('access_Token', access_Token);
            return responseData;
        })
        .then(responseData  => {
          handle_Login_Response(responseData);
        });
      
    } catch (error) {
        console.error('오류 발생:', error);
    }
  };

  const handle_Login_Response = (responseData) => {
    const statusCode = responseData.status.code;
    const message = responseData.status.message;

    switch (statusCode) {
      case 200:
          console.log( message);
          navigate('/MyPage');
          break;
      case 400:
      case 401:
          console.error(message);
          break;
      default:
          console.error(message);
          break;
    }
  };

  
  return (
    <div className="Login_page">
      <div className="Login_Body">
          <div className="Login_WebIde">WEB IDE</div>
          <div className="Login_InputBox">
            <form className="Login_container">  
              <div className="Login_Id">
                <input 
                  type="Id" 
                  placeholder=" Id" 
                  value={Id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div className="Login_Pw">
                <input 
                  type="password" 
                  placeholder=" password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </form>
            
            <div className="Login_Btn">
                <button
                  className='Login_Button' 
                  type="button" 
                  onClick={() => LoginClick()}
                >
                  로그인
                </button>
              </div>

            <div className="Login_CreateAccount">
              <span>계정이 없으신가요?</span>
              <Link className="Login_Link" to="/Join">회원가입</Link>
            </div>

          </div>
        </div>
    </div>
  );
}

export default LoginPage;
