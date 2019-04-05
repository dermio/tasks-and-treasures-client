import React from "react";
import { shallow, mount } from "enzyme";

import CreateOrUpdatePrizeForm from "./create-update-prize-form";
import { isTrimmed } from "../validators";


describe("<CreateOrUpdatePrizeForm />", () => {
  it("Renders without crashing", () => {
    shallow(<CreateOrUpdatePrizeForm />);
  });
});

