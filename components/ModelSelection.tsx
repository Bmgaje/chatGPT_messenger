// import useSWR from "swr";
import Select from "react-select";

function ModelSelection({ model, models, setModel, isLoading }: any) {
  return (
    <div>
      <Select
        className="mt-2"
        options={models}
        defaultValue={model}
        placeholder={model}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        classNames={{
          control: (state) => "bg-[#434654] border-[#434654]",
        }}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
}

export default ModelSelection;
