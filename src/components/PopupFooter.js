import { h } from "preact";
import usePromise from "../hooks/usePromise";
import { getSavesCount } from "../repositories/text-repository";

const PopupFooter = () => {
  const { error, loading, result: count } = usePromise(getSavesCount, []);
  const showCount = !error && !loading;
  return (
    <footer>
      {showCount && (
        <a href="#">{count <= 5 ? "More details" : `See all ${count} saves`}</a>
      )}
      <a href="#">Options</a>
      <a href="#">Upgrade to premium</a>
    </footer>
  );
};

export default PopupFooter;
