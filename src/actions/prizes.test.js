import {
  GET_PRIZE_SUCCESS, getPrizeSuccess,
  CREATE_PRIZE_SUCCESS, createPrizeSuccess,
  DELETE_PRIZE_SUCCESS, deletePrizeSuccess,
} from "./prizes";

describe("getPrizeSuccess", () => {
  it("Should return the action for Get Prize success", () => {
    const data = {
      prizeName: "Disneyland",
      familyCode: "smith"
    };
    const action = getPrizeSuccess(data);

    expect(action.type).toEqual(GET_PRIZE_SUCCESS);
    expect(action.data).toEqual(data);
  });
});

/* The createOrUpdatePrize thunk uses CREATE_PRIZE_XXX action creators
to Create and Update the Prize */
describe("createPrizeSuccess", () => {
  it("Should return the action for Create Prize success", () => {
    const data = {
      prizeName: "Movie night",
      familyCode: "adams"
    };
    const action = createPrizeSuccess(data);

    expect(action.type).toEqual(CREATE_PRIZE_SUCCESS);
    expect(action.data.prizeName).toEqual(data.prizeName);
  });
});

describe("deletePrizeSuccess", () => {
  it("Should return the action for Delete Prize success", () => {
    const data = {
      status: 204
    };
    const action = deletePrizeSuccess(data);

    expect(action.type).toEqual(DELETE_PRIZE_SUCCESS);
    expect(action.data.status).toEqual(204);
  });
});

