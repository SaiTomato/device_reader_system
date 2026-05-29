import {

useState

} from "react";

function PcEditPage() {

const [pcName, setPcName]

= useState("");

return (

<div>

  <h1>
    PC Edit Page
  </h1>

  <div>

    <label>
      PC名
    </label>

    <br />

    <input

      type="text"

      value={pcName}

      onChange={(event) => {

        setPcName(
          event.target.value
        );

      }}

    />

  </div>

  <p>

    入力値:
    {pcName}

  </p>

</div>

);

}

export default PcEditPage;
