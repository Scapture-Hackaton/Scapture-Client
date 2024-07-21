import { test } from "../functions/function";
import "../scss/scapture.scss";
const Scapture = () => {
  return (
    <div className="test">
      <div>{test()}</div>
      <div>Scapture.tsx</div>
    </div>
  );
};

export default Scapture;
