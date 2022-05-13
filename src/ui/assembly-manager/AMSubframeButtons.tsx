import { Assembly } from "../../assembly/Assembly"
import { teleportPlayer } from "../../blueprint/AreaIdentification"
import { bound, Classes, reg } from "../../lib"
import { Component, FactorioJsx, Spec } from "../../lib/factoriojsx"
import { L_Gui } from "../../locale"
import { TeleportButton, TrashButton } from "../components/buttons"
import { HorizontalPusher } from "../components/misc"
import { showDialogue } from "../window/Dialog"
import { ResetButton, SaveButton } from "./SaveButtons"

@Classes.register()
export class AMSubframeButtons extends Component<{ assembly: Assembly }> {
  assembly!: Assembly

  render(props: { assembly: Assembly }): Spec {
    this.assembly = props.assembly

    return (
      <frame
        style="subheader_frame"
        direction="horizontal"
        styleMod={{
          horizontally_stretchable: true,
        }}
      >
        <SaveButton assembly={this.assembly} />
        <ResetButton assembly={this.assembly} />
        <HorizontalPusher />
        <TeleportButton tooltip={[L_Gui.TeleportToAssembly]} onClick={reg(this.teleport)} />
        <TrashButton tooltip={[L_Gui.DeleteAssembly]} onClick={reg(this.confirmDelete)} />
      </frame>
    )
  }

  @bound
  private teleport(e: OnGuiClickEvent) {
    teleportPlayer(game.get_player(e.player_index)!, this.assembly)
  }

  @bound
  private confirmDelete(e: OnGuiClickEvent) {
    const player = game.get_player(e.player_index)!
    showDialogue(player, {
      title: ["gui.confirmation"],
      message: [L_Gui.DeleteAssemblyConfirmation, this.assembly.displayName.get()],
      backCaption: ["gui.cancel"],
      confirmCaption: ["gui.delete"],
      redConfirm: true,
      onConfirm: reg(this.deleteAssembly),
    })
  }

  @bound
  private deleteAssembly() {
    this.assembly.delete()
  }
}
