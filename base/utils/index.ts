import { NextFunction, Request, Response } from "express";
import IncorrectRequest from "../errors/IncorrectRequest.js";
import { Model, SortOrder } from "mongoose";
import NotFound from "../errors/NotFound.js";

export function isEmptyObject(obj: object) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

function queryParamsNotValid(req: Request) {
  const { limit = 5, page = 1, ordering = "_id:-1" } = req.query;
  const [_, order] = String(ordering).split(":");
  if (
    Number(limit) <= 0 ||
    Number(page) <= 0 ||
    Number.isNaN(Number(limit)) ||
    Number.isNaN(Number(page)) ||
    (Number(order) !== 1 && Number(order) !== -1)
  ) {
    return true;
  }

  return false;
}

export async function paginateResponse<T>(
  req: Request,
  res: Response,
  next: NextFunction,
  model: Model<T>,
  populateField: string = "",
  fieldNames?: string[]
) {
  if (queryParamsNotValid(req)) next(new IncorrectRequest());

  const { limit = 5, page = 1, ordering = "_id:-1" } = req.query;

  const [field, order] = String(ordering).split(":");

  const sortObj = {
    [field]: Number(order) as SortOrder,
  };

  const skip = (Number(page) - 1) * Number(limit);

  let allItems = await model
    .find()
    .sort(sortObj)
    .skip(skip)
    .limit(Number(limit))
    .populate(populateField, fieldNames)
    .exec();

  if (allItems.length > 0) {
    return res.status(201).json(allItems);
  } else {
    next(new NotFound("Items not found"));
  }
}
