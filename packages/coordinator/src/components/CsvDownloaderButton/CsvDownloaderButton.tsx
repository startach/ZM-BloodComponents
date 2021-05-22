import CsvDownloader from "react-csv-downloader";
import { IColumn } from "react-csv-downloader/dist/esm/lib/csv";
import Button from "../Button";

export interface ZMCsvDownloaderButtonProps {
  columns?: IColumn[];
  data: { [key: string]: any }[];
  fileName: string;
  separator?: string;
  title: string;
  onClick?: () => void;
  className?: string;
  isDisabled?: boolean;
}

export default function ZMCsvDownloaderButton({
  columns,
  data,
  fileName,
  separator = ",",
  title,
  onClick,
  className,
  isDisabled,
}: ZMCsvDownloaderButtonProps) {
  return (
    <CsvDownloader
      columns={columns}
      datas={data}
      filename={fileName}
      separator={separator}
    >
      <Button
        title={title}
        onClick={() => onClick}
        className={className}
        isDisabled={isDisabled}
      />
    </CsvDownloader>
  );
}
