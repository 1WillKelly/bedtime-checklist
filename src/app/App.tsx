import { useAppState } from './useAppState'
import { ArtStyleProvider } from '../components/ArtStyleContext'
import { GoodnightScreen } from '../features/goodnight/GoodnightScreen'
import { BedtimeStartScreen } from '../features/routine/BedtimeStartScreen'
import { RoutineScreen } from '../features/routine/RoutineScreen'
import { NameScreen } from '../features/setup/NameScreen'
import { RoutineSetupScreen } from '../features/setup/RoutineSetupScreen'
import { WelcomeScreen } from '../features/setup/WelcomeScreen'
import { ParentSettings } from '../features/settings/ParentSettings'

/**
 * Screen router. There is intentionally no URL routing, history or back
 * button: during the routine the only way forward is the big button, and the
 * only way out is the settings control in the corner.
 */
export function App() {
  const app = useAppState()
  const { settings, session, tasks } = app

  const screen = () => {
    if (app.parentOpen) {
      return (
        <ParentSettings
          settings={settings}
          onSave={app.saveParentSettings}
          onResetRoutine={app.resetTonight}
          onArtStyleChange={app.setArtStyle}
          onResetEverything={app.resetEverything}
          onClose={app.closeParent}
        />
      )
    }

    if (!settings.setupComplete) {
      if (app.setupStep === 'welcome') {
        return <WelcomeScreen onContinue={() => app.setSetupStep('name')} />
      }

      if (app.setupStep === 'name') {
        return (
          <NameScreen
            initialName={settings.child.name}
            onContinue={(name) => {
              app.setChildName(name)
              app.setSetupStep('routine')
            }}
          />
        )
      }

      return (
        <RoutineSetupScreen
          routine={settings.routine}
          onToggle={app.toggleTask}
          onMove={app.reorderTask}
          onStart={() => app.completeSetup(settings.child.name, settings.routine)}
        />
      )
    }

    if (session.phase === 'goodnight' || tasks.length === 0) {
      return (
        <GoodnightScreen childName={settings.child.name} onOpenParentSettings={app.openParent} />
      )
    }

    if (session.phase === 'start') {
      return (
        <BedtimeStartScreen
          childName={settings.child.name}
          onStart={app.beginBedtime}
          onOpenParentSettings={app.openParent}
        />
      )
    }

    return (
      <RoutineScreen
        tasks={tasks}
        currentIndex={session.currentIndex}
        completedCount={session.completedIds.length}
        transitioning={session.transitioning}
        childName={settings.child.name}
        onComplete={app.completeCurrentTask}
        onCelebrationEnd={app.advanceAfterCelebration}
        onOpenParentSettings={app.openParent}
      />
    )
  }

  // Wraps every screen, so the drawn/emoji choice reaches TaskIllustration
  // wherever it appears — routine, celebration overlay and settings list.
  return <ArtStyleProvider value={settings.artStyle}>{screen()}</ArtStyleProvider>
}
