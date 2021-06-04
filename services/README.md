# Service 계층에 비지니스 로직을 넣으십시오

비지니스 로직은 service 계층에 있어야 합니다.

이는 분명한 목적이 있는 클래스들의 집합이며, SOLID 원칙을 node.js에 적용한 것입니다.

### 이 레이어에는 ‘SQL query’ 형태의 코드가 있어서는 안됩니다. 그것은 data access layer에서 사용해야 합니다.

- 코드를 express.js router에서 분리하십시오.

- service 레이어에는 req와 res 객체를 전달하지 마십시오.

- 상태 코드 또는 헤더와 같은 HTTP 전송 계층과 관련된 것들은 반환하지 마십시오.

예시
``` javascript
import UserModel from '../models/user';
import CompanyModel from '../models/company';

export default class UserService() {

  async Signup(user) {
    const userRecord = await UserModel.create(user);
    const companyRecord = await CompanyModel.create(userRecord); // needs userRecord to have the database id 
    const salaryRecord = await SalaryModel.create(userRecord, companyRecord); // depends on user and company to be created
    
    ...whatever
    
    await EmailService.startSignupSequence(userRecord)

    ...do more stuff

    return { user: userRecord, company: companyRecord };
  }
}
```

# Pub/Sub 계층 사용
간단한 node.js API 앤드포인트에서 사용자를 생성한 뒤, third-party 서비스를 호출하거나, 서비스 분석을 시도하거나, 이메일 전송과 같은 작업을 하고 싶을 수 있습니다.

금세 간단한 “create” 작업이 여러 가지 일을 하기 시작할 것이며, 하나의 함수 안에 1000줄이 넘어가는 코드가 생길 것입니다.

이는 단일 책임 원칙(principle of single responsibility)를 위배합니다.

시작부터 책임들을 분리하여 간결하게 코드를 유지 관리 할 수 있습니다.

``` javascript
import UserModel from '../models/user';
import CompanyModel from '../models/company';
import SalaryModel from '../models/salary';

export default class UserService() {

  async Signup(user) {
    const userRecord = await this.userModel.create(user);
    const companyRecord = await this.companyModel.create(user);
    this.eventEmitter.emit('user_signup', { user: userRecord, company: companyRecord })
    return userRecord
  }
}
```

``` javascript
eventEmitter.on('user_signup', ({ user, company }) => {

  eventTracker.track(
    'user_signup',
    user,
    company,
  );

  intercom.createUser(
    user
  );

  gaAnalytics.event(
    'user_signup',
    user
  );
})
```

``` javascript
eventEmitter.on('user_signup', async ({ user, company }) => {
  const salaryRecord = await SalaryModel.create(user, company);
})
```

``` javascript
eventEmitter.on('user_signup', async ({ user, company }) => {
  await EmailService.startSignupSequence(user)
})
```
[node eventEmitter 정리](https://edykim.com/ko/post/events-eventemitter-translation-in-node.js/)