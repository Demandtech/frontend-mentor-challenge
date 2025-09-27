import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider, useApp } from "@/components/context/AppContext";

function TestComponent() {
  const { state, dispatch, searchQuery, setSearchQuery } = useApp();

  return (
    <>
      <div data-testid="measurement">{state.measurement}</div>
      <div data-testid="search">{searchQuery}</div>
      <button onClick={() => dispatch({ type: "SET_MEASUREMENT" })}>
        Toggle
      </button>
      <button onClick={() => setSearchQuery("hello")}>SetSearch</button>
    </>
  );
}

describe("AppProvider", () => {
  it("provides default state", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId("measurement").textContent).toBe("Metric");
    expect(screen.getByTestId("search").textContent).toBe("");
  });

  it("updates state via dispatch", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    fireEvent.click(screen.getByText("Toggle"));
    expect(screen.getByTestId("measurement").textContent).toBe("Imperial");
  });

  it("updates search query", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    fireEvent.click(screen.getByText("SetSearch"));
    expect(screen.getByTestId("search").textContent).toBe("hello");
  });
});
