import { useStore } from "src/core/infrastructure/store";
import SidebarMenuItem from "./item";
import { projects } from "./items";
import ItemsList from "./ItemsList";
import SubMenuWrapper from "./SubMenuWrapper";

const SidebarMenu = () => {
    const setTaskGroupToView = useStore((state) => state.setTaskGroupToView);
    return (
        <>
            {projects.map((project) => {
                const hasChildren = (project.children?.length ?? 0) > 0;
                return (
                    /**
                     * Each project is structured like this:
                     *
                     * Project
                     *  - Group
                     *  - Group
                     *  - Group
                     */
                    <ItemsList key={project.title}>
                        <SubMenuWrapper>
                            <SidebarMenuItem
                                title={project.title}
                                icon={project.icon}
                                badge={project.badge}
                                onClick={() =>
                                    setTaskGroupToView({
                                        projectId: project.id,
                                        groupId: undefined,
                                    })
                                }
                            >
                                {hasChildren && (
                                    <SubMenuWrapper>
                                        {project.children?.map((group) => {
                                            return (
                                                <SidebarMenuItem
                                                    key={group.title}
                                                    title={group.title}
                                                    onClick={() =>
                                                        setTaskGroupToView({
                                                            projectId: project.id,
                                                            groupId: group.id,
                                                        })
                                                    }
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
