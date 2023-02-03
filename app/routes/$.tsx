import PageComponent, { handle } from "~/route-containers/entry.component";
import { loader } from "~/route-containers/entry.server";
import { useCatch } from "@remix-run/react";

export default PageComponent;
export { loader, handle };

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}
