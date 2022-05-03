// Generated by gen-locale-defs.ts

export declare const enum L_Bbpp {
  /** __1__ from __2__ */
  EntityFromPlace = "bbpp.entity-from-place",
}
export declare const enum L_Diagnostic {
  /** __2__ overlaps with __1__. */
  Overlap = "bbpp.diagnostic.overlap",
  /** __1__ was upgraded to __2__, which is not pasteable. */
  CannotUpgrade = "bbpp.diagnostic.cannot-upgrade",
  /** A change in item requests (modules, fuel) will have no effect when pasted. */
  ItemsIgnoredOnPaste = "bbpp.diagnostic.items-ignored-on-paste",
  /** The property "__1__" is not yet supported. Please report this to the mod author! */
  UnsupportedProp = "bbpp.diagnostic.unsupported-prop",
  /** The import "__1__" is no longer valid. */
  InvalidImport = "bbpp.diagnostic.invalid-import",
}
export declare const enum L_Interaction {
  /** An unexpected error occurred: __1__. Additional details outputted to log. Please report this to the mod author! */
  UnexpectedError = "bbpp.interaction.unexpected-error",
  /** Could not clear cursor */
  CannotClearCursor = "bbpp.interaction.cannot-clear-cursor",
  /** Select an area for the new assembly */
  SelectAreaForAssembly = "bbpp.interaction.select-area-for-assembly",
  /** This area intersects with an existing assembly: __1__ */
  IntersectsExistingAssembly = "bbpp.interaction.intersects-existing-assembly",
  /** The import does not intersect with the target assembly at this location. */
  ImportDoesNotIntersectAssembly = "bbpp.interaction.import-does-not-intersect-assembly",
  /** The source or target assembly no longer exists. */
  ImportNoLongerValid = "bbpp.interaction.import-no-longer-valid",
  /** Flipped or rotated imports are currently not supported. */
  CannotFlipOrRotateImport = "bbpp.interaction.cannot-flip-or-rotate-import",
  /** An import from "__1__" was created on "__2__". */
  ImportCreated = "bbpp.interaction.import-created",
  /** Assembly saved\n  [font=default-bold]__1__[/font] entities */
  AssemblySaved = "bbpp.interaction.assembly-saved",
}
export declare const enum L_Gui {
  /** <Unnamed assembly> */
  UnnamedAssembly = "bbpp.gui.unnamed-assembly",
  /** Rename assembly */
  RenameAssembly = "bbpp.gui.rename-assembly",
  /** Cancel rename */
  CancelRenameAssembly = "bbpp.gui.cancel-rename-assembly",
  /** Save */
  Save = "bbpp.gui.save",
  /** Save the current assembly, and reset the area. */
  SaveButtonTooltip = "bbpp.gui.save-button-tooltip",
  /** There are paste conflicts in this assembly. Some entities may not save as expected. Are you sure you want to save? */
  ConfirmSaveWithPasteConflicts = "bbpp.gui.confirm-save-with-paste-conflicts",
  /** View conflicts */
  ViewConflicts = "bbpp.gui.view-conflicts",
  /** Some entities from imports have been deleted. These will be re-added upon resetting the assembly, and so will not be saved. Are you sure you want to save? */
  ConfirmSaveWithDeletions = "bbpp.gui.confirm-save-with-deletions",
  /** Reset */
  Reset = "bbpp.gui.reset",
  /** Resets the current assembly. [font=default-bold]Shift-click[/font] to skip confirmation dialog. */
  ResetButtonTooltip = "bbpp.gui.reset-button-tooltip",
  /** Are you sure you want to reset this assembly? Any unsaved changes will be lost. */
  ConfirmResetAssembly = "bbpp.gui.confirm-reset-assembly",
  /** Teleport to assembly */
  TeleportToAssembly = "bbpp.gui.teleport-to-assembly",
  /** Delete assembly */
  DeleteAssembly = "bbpp.gui.delete-assembly",
  /** Are you sure you want to delete the assembly "__1__"? */
  DeleteAssemblyConfirmation = "bbpp.gui.delete-assembly-confirmation",
  /** Imports */
  Imports = "bbpp.gui.imports",
  /** Add import */
  AddImport = "bbpp.gui.add-import",
  /** Choose import source */
  ChooseImportSource = "bbpp.gui.choose-import-source",
  /** There are no importable assemblies. */
  NoSourceAssemblies = "bbpp.gui.no-source-assemblies",
  /** Delete import */
  DeleteImport = "bbpp.gui.delete-import",
  /** Are you sure you want to delete the import from "__1__"? */
  DeleteImportConfirmation = "bbpp.gui.delete-import-confirmation",
  /** This import no longer exists. */
  ImportNoLongerExists = "bbpp.gui.import-no-longer-exists",
  /** Assemblies */
  AssemblyOverviewTitle = "bbpp.gui.assembly-overview-title",
  /** All assemblies [img=info] */
  AssemblyOverviewCaption = "bbpp.gui.assembly-overview-caption",
  /** [font=default-bold]Click[/font] to open details.\n[font=default-bold]Control-click[/font] to teleport to assembly location. */
  AssemblyOverviewCaptionTooltip = "bbpp.gui.assembly-overview-caption-tooltip",
  /** No assemblies */
  NoAssemblies = "bbpp.gui.no-assemblies",
  /** New assembly */
  NewAssembly = "bbpp.gui.new-assembly",
  /** Assembly: */
  AssemblyManagerTitle = "bbpp.gui.assembly-manager-title",
}
