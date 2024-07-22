module.exports = {
  singleQuote: true,
  // 문자열은 따옴표로 formatting
  semi: true,
  //코드 마지막에 세미콜른이 있게 formatting
  useTabs: false,
  //탭의 사용을 금하고 스페이스바 사용으로 대체하게 formatting
  tabWidth: 2,
  // 들여쓰기 너비는 2칸
  trailingComma: 'all',
  // 자세한 설명은 구글링이 짱이긴하나 객체나 배열 키:값 뒤에 항상 콤마를 붙히도록 formatting
  printWidth: 80,
  // 코드 한줄이 maximum 80칸
  arrowParens: 'avoid',
  // 화살표 함수가 하나의 매개변수를 받을 때 괄호를 생략하게 formatting

  // arrowParens: 'always', // 기본값

  bracketSpacing: true, // 기본값. true인 경우 {foo:bar}는 { foo: bar }로 변환됨

  endOfLine: 'lf', // 줄 끝 문자를 LF로 강제 설정
};
