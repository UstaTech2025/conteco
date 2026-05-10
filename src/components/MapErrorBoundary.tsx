"use client";

import { Component, ReactNode } from "react";

interface Props { children: ReactNode }
interface State { hasError: boolean }

export default class MapErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl text-gray-400 text-sm">
          Harita yüklenemedi
        </div>
      );
    }
    return this.props.children;
  }
}
