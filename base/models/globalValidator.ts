import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  validator: (value: string): boolean => value.trim() !== "",
  message: ({ path }: { path: string }): string =>
    `The field ${path} is required.`,
});
