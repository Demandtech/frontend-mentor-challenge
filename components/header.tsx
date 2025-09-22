"use client";

import { Image } from "@heroui/image";
import { Link } from "@heroui/link";
import NextImage from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import DropdownIcon from "@/public/assets/images/icon-dropdown.svg";
import UnitIcon from "@/public/assets/images/icon-units.svg";
import { Selection } from "@react-types/shared";
import { GroupType } from "@/types";
import { State, useApp } from "./context/AppContext";

function Header() {
  const { state, dispatch } = useApp();

  const initialUnits = {
    temperature: state.temperature ?? "celsius",
    wind: state.wind ?? "kmh",
    precipitation: state.precipitation ?? "mm",
    measurement: state.measurement ?? "Metric",
  };

  const groups: GroupType = {
    temperature: ["celsius", "fahrenheit"],
    wind: ["kmh", "mph"],
    precipitation: ["mm", "inch"],
  };

  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set([
      initialUnits.temperature,
      initialUnits.wind,
      initialUnits.precipitation,
    ])
  );

  const handleSelectionChange = (keys: Selection) => {
    const last = Array.from(keys).pop() as string;

    if (!last) return;

    if (Array.from(keys).includes("measurement")) {
      dispatch({
        type: "SET_MEASUREMENT",
      });
      return;
    }

    for (const [group, items] of Object.entries(groups)) {
      if (items.includes(last)) {
        if (group == "temperature") {
          dispatch({
            type: "SET_TEMPERATURE",
            payload: last as State["temperature"],
          });
        } else if (group == "wind") {
          dispatch({
            type: "SET_WIND",
            payload: last as State["wind"],
          });
        } else if (group == "precipitation") {
          dispatch({
            type: "SET_PRECIPITATION",
            payload: last as State["precipitation"],
          });
        }

        setSelectedKeys((prev) => {
          const updated = new Set(
            Array.from(prev).filter((k) => !items.includes(k as string))
          );
          updated.add(last);
          return updated;
        });
      }
    }
  };

  useEffect(() => {
    setSelectedKeys(
      new Set([state.temperature, state.wind, state.precipitation])
    );
  }, [state.temperature, state.wind, state.precipitation]);

  const menuItemClasses = {
    base: [
      "mb-1 rounded-md",
      "data-[hover=true]:bg-neutral-700",
      "data-[selected=true]:bg-neutral-700",
      "data-[selected=true]:text-white",
    ],
  };

  return (
    <header>
      <div className="flex items-center justify-between w-full">
        <Link href="/" as={NextLink} aria-label="Weather Now homepage">
          <Image
            alt="Weather Now"
            src={"/assets/images/logo.svg"}
            as={NextImage}
            height={37}
            width={180}
            role="Logo"
          />
        </Link>

        <Dropdown
          placement="bottom-end"
          className="relative bg-neutral-800 rounded-md border-1 border-neutral-700"
          classNames={{
            base: "p-0",
            content: "p-0",
          }}
        >
          <DropdownTrigger>
            <Button
              className="data-[focus-visible=true]:outline-neutral-200 bg-neutral-800 text-foreground rounded-md"
              variant="solid"
              startContent={<UnitIcon />}
              endContent={<DropdownIcon />}
              aria-label="Change measurement units"
            >
              Units
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Units dropdown menu"
            closeOnSelect={false}
            selectionMode="multiple"
            disallowEmptySelection
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelectionChange}
            color="primary"
          >
            <DropdownItem
              key="measurement"
              hideSelectedIcon
              textValue={state.measurement == "Metric" ? "Imperial" : "Metric"}
              aria-checked={state.measurement === "Metric" ? false : true}
              role="menuitemcheckbox"
              className="data-[focus-visible=true]:outline-neutral-200 data-[focus-visible=true]:outline-1"
            >
              Switch to {state.measurement == "Metric" ? "Imperial" : "Metric"}
            </DropdownItem>

            <DropdownSection
              classNames={{
                divider: "bg-neutral-700",
              }}
              showDivider
              title="Temperature"
              aria-label="Temperature units"
            >
              <DropdownItem
                key="celsius"
                textValue="Celsius"
                classNames={menuItemClasses}
                className="data-[focus-visible=true]:outline-neutral-200 data-[focus-visible=true]:outline-1"
              >
                Celsius (°C)
              </DropdownItem>
              <DropdownItem
                textValue="fahrenheit"
                key="fahrenheit"
                classNames={menuItemClasses}
                className="data-[focus-visible=true]:outline-neutral-200 data-[focus-visible=true]:outline-1"
              >
                Fahrenheit (°F)
              </DropdownItem>
            </DropdownSection>
            <DropdownSection
              classNames={{
                divider: "bg-neutral-700",
              }}
              showDivider
              title="Wind Speed"
            >
              <DropdownItem
                textValue="kmh"
                key="kmh"
                classNames={menuItemClasses}
                className="data-[focus-visible=true]:outline-neutral-200 data-[focus-visible=true]:outline-1"
              >
                km/h
              </DropdownItem>
              <DropdownItem
                key="mph"
                textValue="mph"
                classNames={menuItemClasses}
                className="data-[focus-visible=true]:outline-neutral-200 data-[focus-visible=true]:outline-1"
              >
                mph
              </DropdownItem>
            </DropdownSection>
            <DropdownSection title="Precipitation">
              <DropdownItem
                key="mm"
                textValue="mm"
                classNames={menuItemClasses}
                className="data-[focus-visible=true]:outline-neutral-200 data-[focus-visible=true]:outline-1"
              >
                Millimeters (mm)
              </DropdownItem>
              <DropdownItem
                key="inch"
                textValue="inch"
                classNames={menuItemClasses}
                className="data-[focus-visible=true]:outline-neutral-200 data-[focus-visible=true]:outline-1"
              >
                Inches (in)
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
}

export default Header;
