"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import SearchIcon from "@/public/assets/images/icon-search.svg";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { motion, AnimatePresence } from "framer-motion";
import LoadingIcon from "@/public/assets/images/icon-loading.svg";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetPlaces } from "@/hooks/useGeoLoaction";
import { useApp } from "./context/AppContext";
import ErrorIcon from "@/public/assets/images/icon-error.svg";

function SearchForm() {
  const listRef = useRef<HTMLDivElement>(null);
  const { dispatch, searchQuery, setSearchQuery, setIsLoading } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [manualSelection, setManualSelection] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const {
    data: places,
    refetch,
    isFetching,
    isError,
  } = useGetPlaces(debouncedSearch);
  const [place, setPlace] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleNameSelect = (place: {
    name: string;
    latitude: number;
    longitude: number;
  }) => {
    setManualSelection(true);
    setSearchQuery(place.name);
    setPlace({
      longitude: place.longitude,
      latitude: place.latitude,
    });
    setIsOpen(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!place) return;

    dispatch({
      type: "SET_LOCATION",
      payload: { latitude: place.latitude, longitude: place.longitude },
    });
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (listRef.current && !listRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (manualSelection) {
      setManualSelection(false);
      return;
    }

    if (debouncedSearch.trim() && debouncedSearch.trim().length > 1) {
      setIsOpen(true);
      refetch();
    } else {
      setIsOpen(false);
    }
  }, [debouncedSearch, refetch]);

  return (
    <form
      role="search"
      aria-label="Weather search"
      onSubmit={(e) => handleSubmit(e)}
      className="lg:max-w-[600px] w-full mx-auto mt-10"
    >
      <div className="flex items-start gap-3 w-full flex-col md:flex-row">
        <div className="w-full relative">
          <div ref={listRef} className="w-full relative">
            <Input
              id="place-search"
              aria-label="Search for a place"
              aria-controls="search-results"
              aria-expanded={isOpen}
              startContent={<SearchIcon />}
              value={searchQuery ?? ""}
              onChange={handleInputChange}
              variant="faded"
              color="secondary"
              placeholder="Search for a place"
              classNames={{
                inputWrapper:
                  "text-neutral-200 data-[focus=true]:outline-neutral-200 data-[focus-visible=true]:outline-neutral-200 bg-neutral-800 border-none rounded-lg px-4 py-6 data-[hover=true]:bg-neutral-700/70 transition-all duration-200 ease-linear",
                input:
                  "text-neutral-200 data-[focus-visible=true]:outline-neutral-200 placeholder:text-foreground",
              }}
            />
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-1 w-full z-50"
                >
                  <Listbox
                    color="primary"
                    aria-label="Search results list"
                    className="absolute top-full mt-2 w-full bg-neutral-800 rounded-lg shadow-md max-h-60 overflow-y-auto z-50 custom-scrollbar"
                  >
                    {isFetching ? (
                      <ListboxItem
                        textValue="Search in progress"
                        className="px-4 py-2 text-neutral-200 text-start"
                        aria-label="Searhing..."
                      >
                        <div role="status" className="flex items-center gap-2">
                          <LoadingIcon className=" animate-spin" />
                          <span>Search in progres</span>
                        </div>
                      </ListboxItem>
                    ) : isError ? (
                      <ListboxItem
                        textValue="Search in progress"
                        className="px-4 py-2 text-neutral-200 text-start"
                        aria-label="Searhing..."
                      >
                        <div role="status" className="flex items-center gap-2">
                          <ErrorIcon />
                          <span>Something went wrong, please try again!</span>
                        </div>
                      </ListboxItem>
                    ) : places && places?.length > 0 ? (
                      places?.map((place) => (
                        <ListboxItem
                          key={place.id}
                          onPress={() => handleNameSelect(place)}
                          className="data-[focus-visible=true]:outline-neutral-200 text-start rounded-lg px-3 py-2 cursor-pointer"
                          aria-label={place.name}
                          textValue={place.name}
                        >
                          {place.name}
                        </ListboxItem>
                      ))
                    ) : (
                      <ListboxItem
                        aria-label="No results found"
                        className="px-4 py-2 text-neutral-400"
                      >
                        <span role="status">No results found</span>
                      </ListboxItem>
                    )}
                  </Listbox>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <Button
          aria-label="Search button"
          type="submit"
          className="data-[focus=true]:outline-blue-500 w-full md:w-auto rounded-md py-6 px-8"
          color="secondary"
          isDisabled={
            debouncedSearch.trim() == "" || debouncedSearch.trim().length < 2
          }
          aria-disabled={
            debouncedSearch.trim() === "" || debouncedSearch.trim().length < 2
          }
        >
          Search
        </Button>
      </div>
    </form>
  );
}

export default SearchForm;
