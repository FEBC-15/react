// TODO 3. Store 생성

// Redux에서는 redux-toolkit 사용을 권장
import { createStore } from "redux";
import counterReducer from "@/redux/counterReducer";

const store = createStore(counterReducer);

export default store;