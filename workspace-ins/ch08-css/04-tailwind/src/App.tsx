import Button from "@components/ui/Button";

function App(){
  return (
    <>
      <h1>04 Tailwind CSS</h1>

      <Button>그냥 버튼</Button>
      <Button type="reset" bg="blue" color="red">취소 버튼</Button>
      <Button type="submit" bg="gray" color="blue">submit 버튼</Button>

    </>
  );
}

export default App;