import { Card, CardBody } from "@heroui/card";

function CurrentForecastLoader() {
  return (
    <Card
      className={`bg-neutral-800  bg-no-repeat bg-center py-10 lg:py-16 lg:min-h-[236px]`}
    >
      <CardBody className="px-5 items-center flex-row">
        <div className="flex flex-col items-center justify-center w-full gap-1">
          <div className="flex space-x-2">
            <span className="w-2 h-2 bg-neutral-200 rounded-full animate-bounce-high delay-0" />
            <span className="w-2 h-2 bg-neutral-200 rounded-full animate-bounce-high delay-1" />
            <span className="w-2 h-2 bg-neutral-200 rounded-full animate-bounce-high delay-2" />
          </div>
          <p className="font-light text-sm font-neutral-200">Loading...</p>
        </div>
      </CardBody>
    </Card>
  );
}

export default CurrentForecastLoader;
