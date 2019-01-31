interface DependencyNode<T extends DependencyNode<T>> {
  parents?: Array<T>;
}

interface DependantDependencyNode<T extends DependencyNode<T>> extends DependencyNode<T> {
  parents: Array<T>;
}

function isDependant<T extends DependencyNode<T>>(node: DependencyNode<T>): node is DependantDependencyNode<T> {
  return node.parents !== undefined && node.parents!.length > 0;
}

type Comparator<T extends DependencyNode<T>> = (a: T, b: T) => number;

class DependencyMap<K, V extends DependencyNode<V>> extends Map<K, V> {
  private sorted: boolean = false;
  private order: Array<V> = [];
  private indexed: Map<V, number> = new Map();
  public comparator?: Comparator<V>;

  constructor(comparator: Comparator<V>);
  constructor(entries: Iterable<[K, V]> | ReadonlyArray<[K, V]>, comparator?: Comparator<V>);
  constructor(arg0: Comparator<V> | ReadonlyArray<[K, V]> | Iterable<[K, V]>, arg1?: Comparator<V>) {
    super(typeof arg0 === "function" ? undefined : arg0 as ReadonlyArray<[K, V]>); //Brute force the Typescript
    if (typeof arg0 === "function") {
      this.comparator = arg0;
    } else {
      this.comparator = arg1;
    }
  }

  set(key: K, value: V): this {
    if (this.sorted) {
      let index: number = isDependant(value) ? Math.max(...value.parents.map((p) => this.order.indexOf(p))) : 0;
      if (this.comparator) {
        while (this.comparator(this.order[index], value) < 0) {
          index++;
        }
      }
      this.order.splice(index, 0, value);
      for (let i = index; i < this.order.length; i++) {
        this.indexed.set(this.order[i], i); // Fix indexed order
      }
    }
    return super.set(key, value);
  }

  public iterOrdered(iter: Iterable<[K, V]>, callback?: (entry: [K, V], index: number, array: Array<[K, V]>) => void): Array<[K, V]> {
    let res: Array<[K, V]> = [...iter].sort((a: [K, V], b: [K, V]) => (this.indexed.get(a[1]) || -1) - (this.indexed.get(b[1]) || -1));
    if (callback) {
      res.forEach(callback);
    }
    return res;
  }
}
