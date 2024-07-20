import { CSSProperties, ReactNode, ReactElement } from 'react';

type ItemSelector = {
    index: number;
    zone?: string;
};

type DropZoneProps = {
    zone: string;
    allow?: string[];
    disallow?: string[];
    style?: CSSProperties;
};

type iconTypes = "Smartphone" | "Monitor" | "Tablet";
type Viewport = {
    width: number;
    height?: number | "auto";
    label?: string;
    icon?: iconTypes | ReactNode;
};
type Viewports = Viewport[];

type FieldOption = {
    label: string;
    value: string | number | boolean;
};
type FieldOptions = Array<FieldOption> | ReadonlyArray<FieldOption>;
type BaseField = {
    label?: string;
};
type TextField = BaseField & {
    type: "text";
};
type NumberField = BaseField & {
    type: "number";
    min?: number;
    max?: number;
};
type TextareaField = BaseField & {
    type: "textarea";
};
type SelectField = BaseField & {
    type: "select";
    options: FieldOptions;
};
type RadioField = BaseField & {
    type: "radio";
    options: FieldOptions;
};
type ArrayField<Props extends {
    [key: string]: any;
} = {
    [key: string]: any;
}> = BaseField & {
    type: "array";
    arrayFields: {
        [SubPropName in keyof Props[0]]: Field<Props[0][SubPropName]>;
    };
    defaultItemProps?: Props[0];
    getItemSummary?: (item: Props[0], index?: number) => string;
    max?: number;
    min?: number;
};
type ObjectField<Props extends {
    [key: string]: any;
} = {
    [key: string]: any;
}> = BaseField & {
    type: "object";
    objectFields: {
        [SubPropName in keyof Props]: Field<Props[SubPropName]>;
    };
};
type Adaptor<AdaptorParams = {}, TableShape extends Record<string, any> = {}, PropShape = TableShape> = {
    name: string;
    fetchList: (adaptorParams?: AdaptorParams) => Promise<TableShape[] | null>;
    mapProp?: (value: TableShape) => PropShape;
};
type ExternalFieldWithAdaptor<Props extends {
    [key: string]: any;
} = {
    [key: string]: any;
}> = BaseField & {
    type: "external";
    placeholder?: string;
    adaptor: Adaptor<any, any, Props>;
    adaptorParams?: object;
    getItemSummary: (item: Props, index?: number) => string;
};
type ExternalField<Props extends {
    [key: string]: any;
} = {
    [key: string]: any;
}> = BaseField & {
    type: "external";
    placeholder?: string;
    fetchList: (params: {
        query: string;
        filters: Record<string, any>;
    }) => Promise<any[] | null>;
    mapProp?: (value: any) => Props;
    mapRow?: (value: any) => Record<string, string | number>;
    getItemSummary?: (item: Props, index?: number) => string;
    showSearch?: boolean;
    initialQuery?: string;
    filterFields?: Record<string, Field>;
    initialFilters?: Record<string, any>;
};
type CustomField<Props extends any = {}> = BaseField & {
    type: "custom";
    render: (props: {
        field: CustomField<Props>;
        name: string;
        id: string;
        value: Props;
        onChange: (value: Props) => void;
        readOnly?: boolean;
    }) => ReactElement;
};
type Field<Props extends any = any> = TextField | NumberField | TextareaField | SelectField | RadioField | ArrayField<Props extends {
    [key: string]: any;
} ? Props : any> | ObjectField<Props extends {
    [key: string]: any;
} ? Props : any> | ExternalField<Props extends {
    [key: string]: any;
} ? Props : any> | ExternalFieldWithAdaptor<Props extends {
    [key: string]: any;
} ? Props : any> | CustomField<Props>;
type Fields<ComponentProps extends DefaultComponentProps = DefaultComponentProps> = {
    [PropName in keyof Omit<Required<ComponentProps>, "children" | "editMode">]: Field<ComponentProps[PropName]>;
};
type FieldProps<ValueType = any, F = Field<any>> = {
    field: F;
    value: ValueType;
    id?: string;
    onChange: (value: ValueType, uiState?: Partial<UiState>) => void;
    readOnly?: boolean;
};

type WithPuckProps<Props> = Props & {
    id: string;
};
type DefaultRootProps = {
    title?: string;
    [key: string]: any;
};
type DefaultComponentProps = {
    [key: string]: any;
    editMode?: boolean;
};
type Content<Props extends {
    [key: string]: any;
} = {
    [key: string]: any;
}> = ComponentData<Props>[];
type PuckComponent<Props> = (props: WithPuckProps<Props & {
    puck: PuckContext;
}>) => JSX.Element;
type PuckContext = {
    renderDropZone: React.FC<DropZoneProps>;
    isEditing: boolean;
};
type ComponentConfig<ComponentProps extends DefaultComponentProps = DefaultComponentProps, DefaultProps = ComponentProps, DataShape = Omit<ComponentData<ComponentProps>, "type">> = {
    render: PuckComponent<ComponentProps>;
    label?: string;
    defaultProps?: DefaultProps;
    fields?: Fields<ComponentProps>;
    resolveFields?: (data: DataShape, params: {
        changed: Partial<Record<keyof ComponentProps, boolean>>;
        fields: Fields<ComponentProps>;
        lastFields: Fields<ComponentProps>;
        lastData: DataShape;
        appState: AppState;
    }) => Promise<Fields<ComponentProps>> | Fields<ComponentProps>;
    resolveData?: (data: DataShape, params: {
        changed: Partial<Record<keyof ComponentProps, boolean>>;
        lastData: DataShape;
    }) => Promise<{
        props?: Partial<ComponentProps>;
        readOnly?: Partial<Record<keyof ComponentProps, boolean>>;
    }> | {
        props?: Partial<ComponentProps>;
        readOnly?: Partial<Record<keyof ComponentProps, boolean>>;
    };
};
type Category<ComponentName> = {
    components?: ComponentName[];
    title?: string;
    visible?: boolean;
    defaultExpanded?: boolean;
};
type Config<Props extends Record<string, any> = Record<string, any>, RootProps extends DefaultRootProps = DefaultRootProps, CategoryName extends string = string> = {
    categories?: Record<CategoryName, Category<keyof Props>> & {
        other?: Category<keyof Props>;
    };
    components: {
        [ComponentName in keyof Props]: Omit<ComponentConfig<Props[ComponentName], Props[ComponentName]>, "type">;
    };
    root?: Partial<ComponentConfig<RootProps & {
        children?: ReactNode;
    }, Partial<RootProps & {
        children?: ReactNode;
    }>, RootData>>;
};
type BaseData<Props extends {
    [key: string]: any;
} = {
    [key: string]: any;
}> = {
    readOnly?: Partial<Record<keyof Props, boolean>>;
};
type ComponentData<Props extends DefaultComponentProps = DefaultComponentProps> = {
    type: keyof Props;
    props: WithPuckProps<Props>;
} & BaseData<Props>;
type RootDataWithProps<Props extends DefaultRootProps = DefaultRootProps> = BaseData<Props> & {
    props: Props;
};
type RootDataWithoutProps<Props extends DefaultRootProps = DefaultRootProps> = Props;
type RootData<Props extends DefaultRootProps = DefaultRootProps> = Partial<RootDataWithProps<Props>> & Partial<RootDataWithoutProps<Props>>;
type MappedItem = ComponentData;
type Data<Props extends DefaultComponentProps = DefaultComponentProps, RootProps extends DefaultRootProps = DefaultRootProps> = {
    root: RootData<RootProps>;
    content: Content<WithPuckProps<Props>>;
    zones?: Record<string, Content<WithPuckProps<Props>>>;
};
type ItemWithId = {
    _arrayId: string;
    _originalIndex: number;
};
type ArrayState = {
    items: ItemWithId[];
    openId: string;
};
type UiState = {
    leftSideBarVisible: boolean;
    rightSideBarVisible: boolean;
    itemSelector: ItemSelector | null;
    arrayState: Record<string, ArrayState | undefined>;
    componentList: Record<string, {
        components?: string[];
        title?: string;
        visible?: boolean;
        expanded?: boolean;
    }>;
    isDragging: boolean;
    viewports: {
        current: {
            width: number;
            height: number | "auto";
        };
        controlsVisible: boolean;
        options: Viewport[];
    };
};
type AppState = {
    data: Data;
    ui: UiState;
};

export { AppState as A, BaseData as B, Config as C, Data as D, ExternalFieldWithAdaptor as E, Field as F, ItemSelector as I, MappedItem as M, NumberField as N, ObjectField as O, PuckComponent as P, RootDataWithProps as R, SelectField as S, TextField as T, UiState as U, Viewports as V, FieldProps as a, DefaultRootProps as b, DropZoneProps as c, DefaultComponentProps as d, RootData as e, ComponentData as f, Content as g, PuckContext as h, ComponentConfig as i, RootDataWithoutProps as j, ItemWithId as k, ArrayState as l, BaseField as m, TextareaField as n, RadioField as o, ArrayField as p, Adaptor as q, ExternalField as r, CustomField as s, Fields as t };
