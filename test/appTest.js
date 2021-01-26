const assert = require('chai').assert;
const chai = require('chai')
const expect = chai.expect
const app = require('../app');

describe('App',function(){

it('A função handleClient retorna o tipo do cliente, nesse caso Regular',function(){
  let result = app.handleClient('Regular: 16Mar2009(mon), 17Mar2009(tues), 18Mar2009(wed)');
  expect(result).to.equal('Regular');
});

it('A função handleDayOfTheWeek retornar os 3 dias da semana, nesse caso mon tue e wed',function(){
  let result = app.handleDayOfTheWeek('Regular: 16Mar2009(mon), 17Mar2009(tues), 18Mar2009(wed)');
  assert.equal(result,'mon,tues,wed');
  
});

it('A função WeekendCheck valida se o dia da semana em questão é fim de semana ou não, nesse caso como o valor é mon, ele deve retornar false',function(){
  let result = app.WeekendCheck('mon');
  expect(result).to.equal(false)
});

it('Para a Entrada 1: Regular: 16Mar2009(mon), 17Mar2009(tues), 18Mar2009(wed), deve-se retornar Lakewood',
function(){
  let result = app.main('Regular: 16Mar2009(mon), 17Mar2009(tues), 18Mar2009(wed)');
  expect(result).to.equal('Lakewood');
});

it('Para a Entrada 2: Regular: 20Mar2009(fri), 21Mar2009(sat), 22Mar2009(sun), deve-se retornar Brigdewood',
function(){
  let result = app.main('Regular: 20Mar2009(fri), 21Mar2009(sat), 22Mar2009(sun)');
  expect(result).to.equal('Bridgewood');
});

it('Para a Entrada 3: Rewards: 26Mar2009(thur), 27Mar2009(fri), 28Mar2009(sat), deve-se retornar Ridgewood',
function(){
  let result = app.main('Rewards: 26Mar2009(thur), 27Mar2009(fri), 28Mar2009(sat)');
  expect(result).to.equal('Ridgewood');
});

});