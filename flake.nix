{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem
    (
      system: let
        pkgs = import nixpkgs {
          inherit system;
        };
      in rec {
        packages = {
          default = pkgs.buildNpmPackage {
            pname = "gacha-sim";
            version = "0.1.0";

            src = ./.;
            npmDepsHash = "sha256-tIiX0qfnQIaLfc/LGj8QOwmLcGykmWmzXZsQtLKZ/eo=";

            npmBuildScript = "build";
          };
        };

        devShells.default = pkgs.mkShell {
          inputsFrom = [packages.default];

          packages = with pkgs; [
            nodejs_23
          ];
        };
      }
    );
}
