import { IController } from "./types";
import { getAutoCompleteList } from "../services/cityAutoComplete";

export const getAutoComplete: IController = async (req, res) => {
  const { input } = req.query as { input: string };
  const { statusCode = 200, ...rest } = await getAutoCompleteList(input);
  res.status(statusCode).json(rest);
}