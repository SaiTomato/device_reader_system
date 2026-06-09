export function showError(
  error: unknown
){

  if(error instanceof Error){

    alert(error.message);

  }else{

    alert(
      "不明なエラーが発生しました"
    );

  }

}