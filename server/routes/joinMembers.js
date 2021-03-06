const express = require('express');
const router = express.Router();
const Member = require('../controller/Members');

router.get('/', function (req, res, next) {
  res.render('members', { title: 'Parking Factory', page: 'Join Members' });
});

router.post('/', function (req, res, next) {
  let body = req.body;
  let totalAmount = Number(body.total_amount);
  let inputAmount = Number(body.input_amount);
  let putSuccess = 0;
  const existCar = '이미 등록된 차량 번호입니다.';
  const existInfo = '차량번호 또는 전화번호가 이미 등록된 번호입니다. 확인해주세요. :(';
  let joinFinish = `${body.name}님 환영합니다. :)`;
  const member = new Member();
  if (totalAmount > inputAmount) {
    let requireAmount = totalAmount - inputAmount;
    let notEnoughMoney = `${requireAmount}원이 부족합니다. :( 투입 금액을 확인해주세요.`;
    res.render('members_error', { title: 'Parking Factory', page: 'Join Members', message: notEnoughMoney });
  } else if (totalAmount < inputAmount) {
    let change = inputAmount - totalAmount;
    joinFinish = `${body.name}님 환영합니다. 거스름돈은 ${change}원입니다. 확인해주세요. :)`;
    member.joinMember(body.name, body.phone_number, body.my_car_number).then((result) => {
      putSuccess = result;
      if (putSuccess === 0) {
        res.render('members_error', { title: 'Parking Factory', page: 'Join Members', message: existCar });
      }
      res.render('members_success', { title: 'Parking Factory', page: 'Join Members', message: joinFinish });
    });
  } else if (totalAmount === inputAmount) {
    member.joinMember(body.name, body.phone_number, body.my_car_number).then((result) => {
      putSuccess = result;
      if (putSuccess === 0) {
        res.render('members_error', { title: 'Parking Factory', page: 'Join Members', message: existInfo });
      }
      res.render('members_success', { title: 'Parking Factory', page: 'Join Members', message: joinFinish });
    });
  }
});
module.exports = router;
