function linkUser(session, provider, authData) {
    let result = false;
    if (session.authData) {
      if (session.authData[provider]) {
        // 이미 계정에 provider 가 연결되어 있는 경우
        return result;
      }
  
      session.authData[provider] = authData;
    } else {
      session.authData = {
        [provider]: authData
      };
    }
  
    result = true;
  
    return result;
}

module.exports = linkUser;