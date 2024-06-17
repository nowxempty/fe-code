

  export const LoginClick = (Id,password,navigate) => {
    // POST 요청 보내기
    //https://salgoo9.site/api/login
    post_Login_Data('https://salgoo9.site/api/login', {
      loginId: Id,
      password: password
    },navigate);
  };
  const post_Login_Data = async (url = '', data = {},navigate) => {
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

    
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(async response => {   
      // 응답 데이터를 Promise로 반환
        const responseData = await response.json();
        // access_Token 추출
        const access_Token = response.headers.get('access');
        localStorage.setItem('access_Token', access_Token);
        return responseData;
    })
    .then(responseData  => {
      handle_Login_Response(responseData,navigate);
    });
  }    
  const handle_Login_Response = (responseData,navigate) => {
    const statusCode = responseData.status.code;
    const message = responseData.status.message;

    switch (statusCode) {
      case 200:
          console.log( message);
          alert(message);
          navigate('/MyPage');
          break;
      case 400:
      case 401:
          console.error(message);
          alert(message);
          break;
      default:
          console.error(message);
          alert(message);
          break;
    }
  };

  export const checkAccessTokenValidity = (navigate) => {
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
  

  