import React from "react";

/**
 * A utility interface that defines a React wrapper component.
 * You can extend this interface by doing this:
 * 
 * ```ts
 * interface Custom extends WrapperProps {
 *      YourFields...
 * }
 * ```
 */
export interface WrapperProps {
    children: React.ReactNode
}