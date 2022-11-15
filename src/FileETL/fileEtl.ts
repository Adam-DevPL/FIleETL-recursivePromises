import { createReadStream, createWriteStream } from "fs";
import { join } from "path";
import { format, parse, writeToPath } from "fast-csv";
import { camelCase } from "camel-case";

const CHUNK_SIZE = 10 * 1024 * 1024;

interface RowData {
  id: string;
  listedPrice: string;
  lastSoldPrice: string;
}
interface ResponseData extends RowData {
  diffrenceBetweenPrices: number | string;
}

export const fileETL = async () => {
  const filePath = join(__dirname, "./data/test.csv");
  const data: ResponseData[] = [];

  createReadStream(filePath, { highWaterMark: CHUNK_SIZE })
    .pipe(
      parse({
        headers: (headers) =>
          headers.map((h) => {
            if (h === "Id" || h === "Listed Price" || h === "Last Sold Price") {
              return camelCase(h);
            }
          }),
      })
    )
    .on("error", (error: any) => console.error(error))
    .on("data", (row: RowData) => {
      let diffrenceBetweenPrices = isNaN(parseInt(row.lastSoldPrice))
        ? parseInt(row.listedPrice)
        : parseInt(row.listedPrice) - parseInt(row.lastSoldPrice);

      data.push({
        id: row.id,
        listedPrice: row.listedPrice,
        lastSoldPrice: row.lastSoldPrice,
        diffrenceBetweenPrices,
      });
    })
    .on("end", (rowCount: number) => {
      console.log(`Parsed ${rowCount} rows`);
      data.unshift({
        id: "Id",
        listedPrice: "listed price",
        lastSoldPrice: "last sold price",
        diffrenceBetweenPrices: "diffrence between prices",
      });
      writeToPath(join(__dirname, "./data/result.csv"), data)
        .on("error", (err) => console.error(err))
        .on("finish", () => console.log("Done writing."));
    });
};
