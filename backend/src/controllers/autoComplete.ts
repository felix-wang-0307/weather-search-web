import { IController } from "./types";
import { getAutoCompleteList } from "../services/cityAutoComplete";

export const getAutoComplete: IController = (req, res) => {
  const { input } = req.query as { input: string };
  res.json(getAutoCompleteList(input));
}