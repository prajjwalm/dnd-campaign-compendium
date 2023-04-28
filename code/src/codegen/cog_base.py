import cog


def gen_foo():
    """
    Input:
    (adventurerLevels, Map<AdventurerClasses, number>)

    Target:
    private _adventurerLevels: Map<AdventurerClasses, number>;

    public set adventurerLevels(value: Map<AdventurerClasses, number>) {
        if (this._adventurerLevels != null) {
            throw new DuplicateInputError();
        }
        this._adventurerLevels = value;
    }

    public get adventurerLevels(): Map<AdventurerClasses, number> {
        if (this._adventurerLevels == null) {
            throw new UnspecifiedInputError();
        }
        return this._adventurerLevels;
    }
    """

def cap_first(s: str):
    return s[0].upper() + s[1:]


type_info = {
    "GameObject": {
        "is_ref": True,
    },
    "WallType": {
        "is_ref": False
    }
}


def is_ref_type(type_name: str) -> bool:
    return type_name in type_info and type_info[type_name]["is_ref"]


def nullable_type(type_name: str) -> str:
    return type_name + ('' if is_ref_type(type_name) else '?')


def cog_lines(lines, indent=0, drop_last=0, eol=True, ltrim=False):
    output = "\n".join((" " * indent) + line for line in lines)
    if drop_last > 0:
        output = output[:-drop_last]
    if ltrim:
        output = output.lstrip()
    if eol:
        cog.outl(output)
    else:
        cog.out(output)


def cog_lines_hanging(checkline, lines, indent=0, drop_last=0, terminus=""):
    cog_lines([checkline], indent, eol=False)
    lines = [" " * len(checkline) + line for line in lines]
    cog_lines(lines, indent, drop_last, eol=False, ltrim=True)
    cog.outl(terminus)


class SearchablePartCogger:
    part_name: str
    fields: dict[str, str]

    def __init__(self, part_name: str, fields: dict[str, str]):
        self.part_name = part_name
        self.fields = fields

    def cog(self, asset_menu_order):
        cog.outl()
        self.cog_details_so(asset_menu_order)
        cog.outl()
        self.cog_query()
        cog.outl()
        self.cog_finder()
        cog.outl()

    def cog_details_so(self, order):
        fields = {
            "prefab": "GameObject",
            **self.fields
        }
        cog_lines([f"[CreateAssetMenu(fileName = \"Data\",\n"
                   f"                 menuName = \"ScriptableObjects/{self.part_name}Part\",\n"
                   f"                 order = {order})]\n"
                   f"public class {self.part_name}PartDetails : ScriptableObject, ISearchablePartDetails\n"
                   f"{{"])
        cog_lines([f"    public {f_type} {cap_first(f_name)} => this.{f_name};\n"
                   f"    [SerializeField] private {f_type} {f_name};\n" for f_name, f_type in fields.items()],
                  drop_last=1)
        cog_lines([f"}}"])

    def cog_query(self):
        cog_lines([f"public class {self.part_name}PartQuery : ISearchablePartQuery",
                   f"{{",
                   f"    private static readonly IDictionary<",
                   f"        {self.part_name}PartQuery, ",
                   f"        List<{self.part_name}PartDetails>",
                   f"    > QueryCache;",
                   f"",
                   f"    private static readonly IList<{self.part_name}PartDetails> AllDetails;",
                   f"",
                   f"    static {self.part_name}PartQuery()",
                   f"    {{",
                   f"        AllDetails = new ReadOnlyCollection<{self.part_name}PartDetails>(",
                   f"            Resources.LoadAll<{self.part_name}PartDetails>(",
                   f"                \"Outpost/ScriptableObjectValues/{self.part_name}Parts\"",
                   f"            )",
                   f"        );",
                   f"",
                   f"        QueryCache = new Dictionary<{self.part_name}PartQuery, ",
                   f"                                    List<{self.part_name}PartDetails>>();",
                   f"    }}",
                   f""])
        cog_lines([f"    private readonly {nullable_type(f_type)} {f_name};" for f_name, f_type in self.fields.items()])
        cog.outl()
        cog_lines_hanging(f"    public {self.part_name}PartQuery(",
                          [f"{nullable_type(f_type)} {f_name}," for f_name, f_type in self.fields.items()],
                          drop_last=1,
                          terminus=")")
        cog_lines([f"    {{"])
        cog_lines([f"        this.{f_name} = {f_name};" for f_name in self.fields.keys()])
        cog_lines([f"    }}",
                   f"",
                   f"    public override int GetHashCode()",
                   f"    {{",
                   f"        HashCode hash = new HashCode();", ])
        cog_lines([f"        hash.Add(this.{f_name});" for f_name in self.fields.keys()])
        cog_lines([f"        return hash.ToHashCode();",
                   f"    }}",
                   f"",
                   f"    public override bool Equals(object obj)",
                   f"    {{",
                   f"        if (obj is not {self.part_name}PartQuery other) {{",
                   f"            return false;",
                   f"        }}",
                   f""])
        cog_lines_hanging(f"        return ",
                          [f"other.{f_name} == this.{f_name} ||" for f_name in self.fields.keys()],
                          drop_last=3,
                          terminus=";")
        cog_lines([f"    }}",
                   f"",
                   f"    private List<{self.part_name}PartDetails> GetAllMatchingPartDetails()",
                   f"    {{",
                   f"        if (QueryCache.ContainsKey(this)) {{",
                   f"            return QueryCache[this];",
                   f"        }}",
                   f"",
                   f"        List<{self.part_name}PartDetails> matchingParts ",
                   f"            = new List<{self.part_name}PartDetails>();",
                   f"",
                   f"        foreach ({self.part_name}PartDetails details in AllDetails) {{"])
        cog_lines([f"            if (this.{f_name} != null &&\n"
                   f"                this.{f_name} != details.{cap_first(f_name)})\n"
                   f"            {{\n"
                   f"                continue;\n"
                   f"            }}" for f_name in self.fields.keys()])
        cog_lines([f"            matchingParts.Add(details);",
                   f"        }}",
                   f"",
                   f"        QueryCache.Add(this, matchingParts);",
                   f"        return matchingParts;",
                   f"    }}",
                   f"",
                   f"    public ISearchablePartDetails GetAnyMatchingPartDetails()",
                   f"    {{",
                   f"        return this.GetAllMatchingPartDetails().RandomElement();",
                   f"    }}",
                   f"}}"])

    def cog_finder(self):
        cog_lines([f"public class {self.part_name}PartFinder : BaseSearchablePartFinder",
                   f"{{"])
        cog_lines([f"    private {nullable_type(f_type)} {f_name};\n"
                   f"    public {self.part_name}PartFinder Set{cap_first(f_name)}({f_type} {f_name})\n"
                   f"    {{\n"
                   f"        this.{f_name} = {f_name};\n"
                   f"        return this;\n"
                   f"    }}\n" for f_name, f_type in self.fields.items()])
        cog_lines([f"    private {self.part_name}PartQuery GetQuery()",
                   f"    {{", ])
        cog_lines_hanging(
            f"        return new {self.part_name}PartQuery(",
            [f"this.{f_name}," for f_name in self.fields.keys()],
            drop_last=1,
            terminus=");"
        )
        cog_lines([f"    }}",
                   f"",
                   f"    protected override ISearchablePartQuery GetQueryBase()",
                   f"    {{",
                   f"        return this.GetQuery();",
                   f"    }}",
                   f"}}",
                   ])


def cog_builder_setter(builder_type: str, field_name: str, field_type: str, default: str):
    cog.outl(f"private {field_type} {field_name} = {default};")
    cog.outl(f"public {builder_type} Set{cap_first(field_name)}({field_type} {field_name})")
    cog.outl("{")
    cog.outl(f"    this.{field_name} = {field_name};")
    cog.outl(f"    return this;")
    cog.outl("}")
    cog.outl()


def serialize_builder_setters(builder_type: str, fields: dict[str, tuple[str, str]]):
    cog.outl()
    for f_name, f_type_default in fields.items():
        cog_builder_setter(builder_type, f_name, *f_type_default)
