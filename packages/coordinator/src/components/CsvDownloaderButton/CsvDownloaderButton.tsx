import CsvDownloader from "react-csv-downloader";
import { IColumn } from "react-csv-downloader/dist/esm/lib/csv";
import Button from "../Button";

export interface ZMCsvDownloaderButtonProps {
  columns?: IColumn[];
  data: { [key: string]: any }[];
  fileName: string;
  title: string;
  className?: string;
  isDisabled?: boolean;
}

export default function ZMCsvDownloaderButton({
  columns,
  data,
  fileName,
  title,
  className,
  isDisabled,
}: ZMCsvDownloaderButtonProps) {
  return (
    <CsvDownloader
      columns={columns}
      datas={data}
      filename={fileName}
      separator={","}
    >
      <Button
        title={title}
        onClick={() => {}}
        className={className}
        isDisabled={isDisabled}
      />
    </CsvDownloader>
  );
}
