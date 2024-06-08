from django import forms
from .models import Timers

class PomodoroForm(forms.ModelForm):
    class Meta:
        model = Timers
        fields = ['title', 'minutes', 'seconds', 'category', 'priority']
        widget = {
			'title' : forms.TextInput(attrs={'required' : 'required'}),
			'seconds': forms.NumberInput(attrs={'required': 'required'}),
			'category' : forms.TextInput(attrs={'required' : 'required'}),
			'priority' : forms.NumberInput(attrs={'required' : 'required'}),
        }

    def clean(self):
        cleaned_data = super().clean()
        minutes = cleaned_data.get('minutes', 0)
        seconds = cleaned_data.get('seconds', 0)

        if minutes <0 or seconds <0:
            raise forms.ValidationError("minutes, seconds must be non-negative.")

        return cleaned_data	