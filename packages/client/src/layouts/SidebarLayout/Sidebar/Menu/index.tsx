import SidebarMenuItem from "./item";
import ItemsList from "./ItemsList";
import SubMenuWrapper from "./SubMenuWrapper";
import { menuItems } from "./items";

const SidebarMenu = () => {
    return (
        <>
            {menuItems.map((section) => {
                const hasChildren = section.children?.length > 0;
                return (
                    /**
                     * Each section is structured like this:
                     *
                     * Heading
                     *  - Child
                     *  - Child
                     *  - Child
                     */
                    <ItemsList key={section.name}>
                        <SubMenuWrapper>
                            <SidebarMenuItem
                                name={section.name}
                                icon={section.icon}
                                link={section.link}
                                badge={section.badge}
                            >
                                {hasChildren && (
                                    <SubMenuWrapper>
                                        {section.children.map((item) => {
                                            return (
                                                <SidebarMenuItem
                                                    key={item.name}
                                                    name={item.name}
                                                    icon={item.icon}
                                                    link={item.link}
                                                    badge={item.badge}
                                                />
                                            );
                                        })}
                                    </SubMenuWrapper>
                                )}
                            </SidebarMenuItem>
                        </SubMenuWrapper>
                    </ItemsList>
                );
            })}
        </>
    );
};

export default SidebarMenu;
