import {Entity} from "../core/GameObjectManager";

let attributeDefs = new Map<string, AttributeDefinition>();


function defSorter(a: AttributeDefinition, b: AttributeDefinition): -1 | 0 | 1 {
  return
}

type baseProperty = number | ((attValues: object) => number);

interface AttDef {
  min?: number;
  max?: number;
}

interface DynamicAttDef extends AttDef {
  base: (...values: Array<number>) => number;
  requires: Array<string | number>; //Must be an attribute definition key
}
interface StaticAttDef extends AttDef {
  base: number;
}

type AttributeDefinition = DynamicAttDef | StaticAttDef

async function initAttributes(eventBus: { emit: (event: string, ...args: any) => Promise<any> }/*TODO: fire register event on bus*/): Promise<Map<string, AttributeDefinition>> {
  let attributeDefs = new Map<string, AttributeDefinition>();
  let rootAttrs: Array<AttributeDefinition> = [];

  function registerAttributeDefinition(name: string, definition: AttributeDefinition): void {
    if (attributeDefs.has(name)) {
      throw new Error(`Attribute ${name} is already defined.`);
    }
    attributeDefs.set(name, definition);
    if (!("requires" in definition) || definition.requires.length < 1) {
      rootAttrs.push(definition);
    }
  }

  await eventBus.emit("registerAttributesEvent", registerAttributeDefinition);
//TODO: sort
  let sortable = new Set(rootAttrs);
  while (sortable.size > 0) {
    let req =
  }
}
