import { test } from '../functions/function';

const MyPage = () => {
  return (
    <div>
      <div>{test()}</div>
      <div>Main.tsx</div>
    </div>
  );
};

export default MyPage;
